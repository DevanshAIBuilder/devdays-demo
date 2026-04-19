import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '../generated/prisma/client.js';

const adapter = new PrismaLibSql({ url: 'file:./prisma/dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'ai-ml' },
      update: {},
      create: { name: 'AI / ML', slug: 'ai-ml', color: '#8B5CF6' },
    }),
    prisma.category.upsert({
      where: { slug: 'web-dev' },
      update: {},
      create: { name: 'Web Dev', slug: 'web-dev', color: '#3B82F6' },
    }),
    prisma.category.upsert({
      where: { slug: 'startups' },
      update: {},
      create: { name: 'Startups', slug: 'startups', color: '#F59E0B' },
    }),
    prisma.category.upsert({
      where: { slug: 'devops' },
      update: {},
      create: { name: 'DevOps', slug: 'devops', color: '#10B981' },
    }),
    prisma.category.upsert({
      where: { slug: 'web3' },
      update: {},
      create: { name: 'Web3 / Blockchain', slug: 'web3', color: '#EC4899' },
    }),
    prisma.category.upsert({
      where: { slug: 'open-source' },
      update: {},
      create: { name: 'Open Source', slug: 'open-source', color: '#EF4444' },
    }),
    prisma.category.upsert({
      where: { slug: 'python' },
      update: {},
      create: { name: 'Python', slug: 'python', color: '#06B6D4' },
    }),
    prisma.category.upsert({
      where: { slug: 'cybersecurity' },
      update: {},
      create: { name: 'Cybersecurity', slug: 'cybersecurity', color: '#6366F1' },
    }),
  ]);

  const [aiMl, webDev, startups, devops, web3, openSource, python, cybersec] = categories;

  type EventInput = Parameters<typeof prisma.event.create>[0]['data'];

  const eventData: EventInput[] = [
    {
      title: 'AI & Copilot Deep Dive: Lucknow Edition',
      slug: 'ai-copilot-deep-dive-lucknow-2026',
      description:
        "Join Lucknow's top AI enthusiasts for a hands-on session on GitHub Copilot Agent mode, LLM fine-tuning, and real-world AI integrations. Built by and for the Lucknow developer community.",
      date: '2026-05-10',
      time: '10:00',
      endTime: '13:00',
      venue: 'IIT Lucknow Campus',
      address: 'NH 27, Sohramau, Lucknow, Uttar Pradesh 226013',
      organizer: 'Lucknow AI Builders',
      registrationUrl: 'https://lko.ai/copilot-deep-dive',
      maxAttendees: 150,
      status: 'upcoming',
      isFeatured: true,
      tags: 'AI,Copilot,LLM,Machine Learning',
      categoryId: aiMl.id,
    },
    {
      title: 'React & Next.js 15 Workshop',
      slug: 'react-nextjs-workshop-lucknow-2026',
      description:
        'Master App Router, Server Actions, and Suspense in this full-day hands-on workshop. Learn to build production-ready full-stack apps with Next.js 15 and React 19. Limited seats.',
      date: '2026-05-24',
      time: '09:30',
      endTime: '17:30',
      venue: 'Lucknow IT Park, Vibhuti Khand',
      address: 'Vibhuti Khand, Gomti Nagar, Lucknow, UP 226010',
      organizer: 'Lucknow JS Community',
      registrationUrl: 'https://lkojscommunity.in/nextjs-workshop',
      maxAttendees: 80,
      status: 'upcoming',
      isFeatured: true,
      tags: 'React,Next.js,TypeScript,Web Dev',
      categoryId: webDev.id,
    },
    {
      title: 'Startup Pitch Night \u2013 Nawabi Innovations',
      slug: 'startup-pitch-night-lucknow-2026',
      description:
        "Pitch your startup idea to a panel of investors and industry mentors. This edition focuses on AgriTech, EdTech, and HealthTech solving UP's unique challenges. Cash prizes worth \u20b92 Lakh.",
      date: '2026-06-07',
      time: '18:00',
      endTime: '21:00',
      venue: 'The Leela Lucknow',
      address: 'Gomti Nagar Extension, Lucknow, UP 226010',
      organizer: 'NASSCOM Lucknow Chapter',
      registrationUrl: 'https://nasscom.in/lko-pitch-night',
      maxAttendees: 200,
      status: 'upcoming',
      isFeatured: true,
      tags: 'Startup,Pitch,Funding,Entrepreneurship',
      categoryId: startups.id,
    },
    {
      title: 'DevOps & Cloud Summit Lucknow',
      slug: 'devops-cloud-summit-lucknow-2026',
      description:
        'A full-day summit on Kubernetes, CI/CD pipelines, and cloud-native architecture. Featuring talks from engineers at AWS, Google Cloud, and local Lucknow tech companies.',
      date: '2026-06-14',
      time: '09:00',
      endTime: '18:00',
      venue: 'Sahara Ganj Mall \u2013 Convention Centre',
      address: 'Shahnajaf Road, Lucknow, UP 226001',
      organizer: 'Lucknow DevOps Guild',
      registrationUrl: 'https://devops.lko/summit-2026',
      maxAttendees: 300,
      status: 'upcoming',
      isFeatured: false,
      tags: 'DevOps,Kubernetes,AWS,Cloud',
      categoryId: devops.id,
    },
    {
      title: 'Web3 & DeFi Builders Meetup',
      slug: 'web3-defi-meetup-lucknow-2026',
      description:
        'Explore the world of decentralised finance, NFT standards, and smart contracts on Ethereum & Solana. Network with Web3 builders and investors based out of Lucknow and UP.',
      date: '2026-06-21',
      time: '16:00',
      endTime: '19:30',
      venue: 'Co-Exist Coworking, Hazratganj',
      address: 'Hazratganj, Lucknow, UP 226001',
      organizer: 'UP Blockchain Council',
      registrationUrl: 'https://upblockchain.org/web3-meetup',
      maxAttendees: 100,
      status: 'upcoming',
      isFeatured: false,
      tags: 'Web3,Blockchain,DeFi,NFT',
      categoryId: web3.id,
    },
    {
      title: 'Open Source Hackathon \u2013 HackLucknow 2026',
      slug: 'open-source-hackathon-lucknow-2026',
      description:
        'A 24-hour hackathon where teams of 2\u20134 developers contribute to real open-source projects. Tracks: Dev Tools, Education, Accessibility. Mentored by OSS maintainers.',
      date: '2026-07-05',
      time: '09:00',
      endDate: '2026-07-06',
      endTime: '09:00',
      venue: 'IIIT Lucknow',
      address: 'Chak Ganjaria C.G. City, Lucknow, UP 226002',
      organizer: 'IIIT Lucknow Open Source Club',
      registrationUrl: 'https://hacklucknow.tech',
      maxAttendees: 250,
      status: 'upcoming',
      isFeatured: true,
      tags: 'Hackathon,Open Source,GitHub',
      categoryId: openSource.id,
    },
    {
      title: 'Python & Data Science Bootcamp',
      slug: 'python-data-science-bootcamp-lucknow-2026',
      description:
        'A weekend bootcamp covering Python fundamentals, pandas, NumPy, and an intro to scikit-learn. Perfect for students and professionals looking to break into data science.',
      date: '2026-07-12',
      time: '10:00',
      endDate: '2026-07-13',
      endTime: '17:00',
      venue: 'Babu Banarasi Das University',
      address: 'BBD City, Faizabad Road, Lucknow, UP 226028',
      organizer: 'PyLucknow',
      registrationUrl: 'https://pylucknow.org/bootcamp',
      maxAttendees: 120,
      status: 'upcoming',
      isFeatured: false,
      tags: 'Python,Data Science,ML,pandas',
      categoryId: python.id,
    },
    {
      title: 'Cybersecurity Awareness & CTF',
      slug: 'cybersecurity-ctf-lucknow-2026',
      description:
        'Half-day awareness workshop followed by a beginner-friendly Capture The Flag competition. Learn about OWASP Top 10, ethical hacking, and defensive security practices.',
      date: '2026-07-19',
      time: '11:00',
      endTime: '17:00',
      venue: 'Lucknow University \u2013 IT Block',
      address: 'University Road, Lucknow, UP 226007',
      organizer: 'OWASP Lucknow Chapter',
      registrationUrl: 'https://owasp.org/lucknow/ctf-2026',
      maxAttendees: 200,
      status: 'upcoming',
      isFeatured: false,
      tags: 'Cybersecurity,CTF,Ethical Hacking,OWASP',
      categoryId: cybersec.id,
    },
    {
      title: 'GenAI Product Demo Day',
      slug: 'genai-product-demo-day-lucknow-2026',
      description:
        'Showcase your GenAI-powered product to an audience of investors, tech leads, and potential users. Applications open for early-stage startups and student builders.',
      date: '2026-08-02',
      time: '14:00',
      endTime: '18:00',
      venue: 'Lohia National Park \u2013 Open Amphitheatre',
      address: 'Lohia Park, Hazratganj, Lucknow, UP 226001',
      organizer: 'Lucknow AI Builders',
      registrationUrl: 'https://lko.ai/demo-day-2026',
      maxAttendees: 300,
      status: 'upcoming',
      isFeatured: true,
      tags: 'GenAI,Product,Demo,Startups',
      categoryId: aiMl.id,
    },
    {
      title: 'Women in Tech Lucknow \u2013 Networking Night',
      slug: 'women-in-tech-lucknow-2026',
      description:
        'A networking and mentorship evening celebrating women in technology from Lucknow. Panel discussions, fireside chats with industry leaders, and 1:1 mentorship sessions.',
      date: '2026-08-09',
      time: '17:30',
      endTime: '20:30',
      venue: 'Taj Mahal Hotel Lucknow',
      address: 'Vipin Khand, Gomti Nagar, Lucknow, UP 226010',
      organizer: 'WTM Lucknow (Women Techmakers)',
      registrationUrl: 'https://wtm.google.com/lucknow',
      maxAttendees: 150,
      status: 'upcoming',
      isFeatured: false,
      tags: 'Women in Tech,Networking,Mentorship,Diversity',
      categoryId: startups.id,
    },
  ];

  for (const data of eventData) {
    await prisma.event.upsert({
      where: { slug: data.slug as string },
      update: {},
      create: data,
    });
  }

  console.log('Seeded categories and Lucknow tech events successfully.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
