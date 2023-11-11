import { router } from './trpc';
import { airportRouter } from './routers/airport';

export const appRouter = router({
  airport: airportRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
