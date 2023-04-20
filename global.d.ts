import { PrismaClient } from '@prisma/client';
import type { DefaultUser } from 'next-auth';

declare global {
  namespace globalThis {
    var prismadb: PrismaClient;
  }
}

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}
