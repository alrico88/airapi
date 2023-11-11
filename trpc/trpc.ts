import { initTRPC } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';
import { Context } from './context';

const t = initTRPC
  .meta<OpenApiMeta>()
  .context<Context>()
  .create({
    errorFormatter: ({ error, shape }) => {
      if (
        error.code === 'INTERNAL_SERVER_ERROR' &&
        process.env.NODE_ENV === 'production'
      ) {
        return { ...shape, message: 'Internal server error' };
      }
      return shape;
    },
  });

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware;
