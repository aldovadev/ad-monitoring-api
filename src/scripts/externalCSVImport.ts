import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { PrismaClient } from '@prisma/client';
import { AdPerformanceCreateDTO, UnderperformingAdsDTO } from '../dtos/adPerformance.dto';

const prisma = new PrismaClient();

const csvFilePath = path.join(__dirname, '../../assets/external_data.csv');

async function main() {
  const start = Date.now();
  console.log('Start Importing External Ad Performance...');

  try {
    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');

    const csvData: UnderperformingAdsDTO[] = parse(fileContent, {
      delimiter: ';',
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    const transformedData: AdPerformanceCreateDTO[] = (
      await Promise.all(
        csvData.map(async (item) => {
          const kpiType = await prisma.kpiType.findUnique({
            where: {
              name: item.kpi_type
            }
          });
          const client = await prisma.client.findUnique({
            where: {
              name: item.client_name
            }
          });

          if (!kpiType || !client) {
            return null;
          }

          const contract = await prisma.contract.findUnique({
            where: {
              client_id_kpi_type_id: {
                client_id: client.id,
                kpi_type_id: kpiType.id
              }
            }
          });

          if (!contract) {
            console.warn(`Skipping missing contract for ${item.client_name} - ${item.kpi_type}`);
            return null;
          }

          return {
            client_id: client.id,
            contract_id: contract.id,
            kpi_type_id: kpiType.id,
            actual_value: item.actual_value,
            date: new Date(item.date).toString()
          }
        })
      )
    ).filter((item): item is AdPerformanceCreateDTO => item !== null);

    const createdAdPerformances = await prisma.adPerformance.createMany({
      data: transformedData.map(item => ({
        client_id: item.client_id,
        contract_id: item.contract_id,
        kpi_type_id: item.kpi_type_id,
        actual_value: parseFloat(item.actual_value.toString()),
        date: new Date(item.date),
      }))
    });

    const durationMs = Date.now() - start;
    await prisma.jobLog.create({
      data: {
        status: 'success',
        duration_ms: durationMs,
        row_count: createdAdPerformances.count,
      }
    });

    console.log('Imported:', createdAdPerformances.count, 'ad performances');
    console.log(`Import Successful! Duration: ${durationMs} ms`);


  } catch (error) {
    const durationMs = Date.now() - start;
    await prisma.jobLog.create({
      data: {
        status: 'failed',
        duration_ms: durationMs,
        row_count: 0,
      }
    });

    console.log(`Import Failed! Duration: ${durationMs} ms`);
  }
}

main();
