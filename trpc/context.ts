import { PrismaClient } from '@prisma/client';
import { inferAsyncReturnType } from '@trpc/server';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = () => ({
  prisma: new PrismaClient(),
});

export type Context = inferAsyncReturnType<typeof createContext>;
