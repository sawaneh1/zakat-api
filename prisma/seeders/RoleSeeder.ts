// seedRoles.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedRoles() {
  try {
    const rolesData = [
      { name: 'Super Admin' },
      { name: 'Admin' },
      { name: 'Zakat Collector' },
      { name: 'User' },
      { name: 'Guest' },
    ];

    for (const roleData of rolesData) {
      await prisma.role.create({
        data: roleData,
      });
    }

    console.log('Roles seed completed successfully!');
  } catch (error) {
    console.error('Error seeding roles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedRoles();
