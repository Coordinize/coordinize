import 'server-only';

import { PrismaClient } from './generated/client';
import { keys } from './keys';

// Global instance handling
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const isProduction = process.env.NODE_ENV === 'production';

// Define createPrismaClient function
function createPrismaClient(options = {}): PrismaClient {
  return new PrismaClient(options);
}

// Create Prisma instance with Neon adapter in production
let database: PrismaClient;

if (isProduction) {
  const { Pool, neonConfig } = require('@neondatabase/serverless');
  const { PrismaNeon } = require('@prisma/adapter-neon');
  const ws = require('ws');

  neonConfig.webSocketConstructor = ws;
  const pool = new Pool({ connectionString: keys().DATABASE_URL });
  const adapter = new PrismaNeon(pool);

  database = globalForPrisma.prisma ?? createPrismaClient({ adapter });
} else {
  database = globalForPrisma.prisma ?? createPrismaClient({});
}

// Store in global variable in development
if (!isProduction) {
  globalForPrisma.prisma = database;
}

export * from './generated/client';
export { database };
