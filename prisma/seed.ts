import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Create seed users
  const user1 = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      email: 'john.doe@example.com',
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      password: 'hashedpassword123', // In real app, this should be properly hashed
      posts: {
        create: [
          {
            title: 'Getting Started with NestJS',
            content:
              'This is a comprehensive guide to getting started with NestJS...',
            published: true,
          },
          {
            title: 'Advanced Prisma Techniques',
            content: 'Learn advanced techniques for working with Prisma ORM...',
            published: false,
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      email: 'jane.smith@example.com',
      username: 'janesmith',
      firstName: 'Jane',
      lastName: 'Smith',
      password: 'hashedpassword456',
      posts: {
        create: [
          {
            title: 'PostgreSQL Best Practices',
            content: 'Learn the best practices for working with PostgreSQL...',
            published: true,
          },
        ],
      },
    },
  });

  console.log('Seed data created:', { user1, user2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
