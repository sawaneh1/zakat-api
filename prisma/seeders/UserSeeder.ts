// seed.ts
import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function seed() {
  try {
    const usersData = [
      {
        name: 'Sulayman Sawaneh',
        email: 'sawameh1@gmail.com',
        username: 'sawaneh1',
        password: await argon2.hash('password'),
        phone: '3810745',
        roleId: 1,
      },

      {
        name: 'Sulayman Sawaneh 4',
        email: 'sawameh22@gmail.com',
        username: 'Guese User',
        password: await argon2.hash('password'),
        phone: '3123457',
        roleId: 5,
      },
     
    ];

    for (const userData of usersData) {
      await prisma.user.create({
        data: userData,
      });
    }

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
