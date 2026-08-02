import { prisma } from '../lib/db/client';

async function main() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:]*@/, ':***@'));
  const properties = await prisma.property.findMany();
  console.log(JSON.stringify(properties, null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
