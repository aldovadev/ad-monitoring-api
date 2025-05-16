import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding clients, KPI Types, and contracts...');

  const clients = await prisma.client.createMany({
    data: [
      { name: 'PT Sinar Awan' },
      { name: 'PT Sinar Bakso' },
      { name: 'PT Sinar Cinta' }
    ],
    skipDuplicates: true
  });

  console.log(`Seeded ${clients.count} clients.`);

  const kpiTypes = await prisma.kpiType.createMany({
    data: [
      { name: 'CTR' },
      { name: 'Impressions' }
    ],
    skipDuplicates: true
  });

  console.log(`Seeded ${kpiTypes.count} KPI Types.`);

  const clientRecords = await prisma.client.findMany();
  const kpiTypeRecords = await prisma.kpiType.findMany();

  const contractData = clientRecords.flatMap(client => (
    kpiTypeRecords.map(kpiType => ({
      client_id: client.id,
      kpi_type_id: kpiType.id,
      kpi_target: kpiType.name === 'CTR' ? 0.03 : 10000,
      start_date: new Date('2025-05-01'),
      end_date: new Date('2025-06-31')
    }))
  ));


  const contracts = await prisma.contract.createMany({
    data: contractData,
    skipDuplicates: true
  });

  console.log(`Seeded ${contracts.count} contracts.`);

  console.log('Seeding completed.');
}

main()
  .catch(e => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
