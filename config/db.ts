import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient;
    }
  }
}

let prisma: PrismaClient;

const globalWithPrisma = global as NodeJS.Global & { prisma?: PrismaClient };

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }

  prisma = globalWithPrisma.prisma;
}

export default prisma;
