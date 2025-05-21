import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

// Prevent creating multiple PrismaClient instances during development
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const db = prisma;
