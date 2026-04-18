import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '../generated/prisma/client.js';

const adapter = new PrismaLibSql({ url: 'file:./prisma/dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.meetup.createMany({
    data: [
      {
        title: 'AI & Copilot Deep Dive',
        date: '2026-05-10',
        description: 'Live coding with GitHub Copilot Agent mode.',
      },
      {
        title: 'Next.js 15 Workshop',
        date: '2026-06-14',
        description: 'App Router, Server Actions, and Suspense.',
      },
      {
        title: 'Open Source Sprint',
        date: '2026-07-12',
        description: 'Hack on real OSS issues together.',
      },
    ],
  });
  console.log('Seeded 3 meetups.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
