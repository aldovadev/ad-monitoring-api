import prisma from '../config/prisma.client';
import { AdPerformanceCreateDTO, AdPerformanceFiltersDTO } from '../dtos/adPerformance.dto';


export const getAdPerformancesRepo = async (filters: AdPerformanceFiltersDTO) => {
  const { date, kpi_type_id, client_id } = filters;

  const adPerformances = await prisma.adPerformance.findMany({
    where: {
      client_id: client_id,
      kpi_type_id: kpi_type_id,
      date: date,
    },
    orderBy: {
      date: 'desc',
    },
    include: {
      contract: {
        include: {
          client: true,
          kpi_type: true,
        }
      }
    }
  });
  return adPerformances
};


export const createAdPerformancesRepo = async (adPerformancesData: AdPerformanceCreateDTO[]) => {
  const createdAdPerformances = await prisma.adPerformance.createMany({
    data: adPerformancesData.map(item => ({
      client_id: item.client_id,
      contract_id: item.contract_id,
      kpi_type_id: item.kpi_type_id,
      actual_value: item.actual_value,
      date: new Date(item.date),
    }))
  });

  return createdAdPerformances;
};