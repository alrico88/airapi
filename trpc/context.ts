import { inferAsyncReturnType } from '@trpc/server';
import { prisma } from 'helpers/prisma';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = () => ({
  prisma,
});

export type Context = inferAsyncReturnType<typeof createContext>;
