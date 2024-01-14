import { router } from './trpc';
import { airportRouter } from './routers/airport';
import { typeaheadRouter } from './routers/typeahead';

export const appRouter = router({
  airport: airportRouter,
  typeahead: typeaheadRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
