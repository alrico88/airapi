import { z } from 'zod'
import { orderBy } from 'lodash-es';
import { publicProcedure, router } from '../trpc';

export const typeaheadRouter = router({
  airport: publicProcedure.meta({
    openapi: {
      method: 'GET',
      path: '/typeahead/airport/{search}',
      tags: ['typeahead', 'airport']
    }
  }).input(z.object({
    search: z.string()
  })).output(z.array(z.object({
    icao: z.string(),
    name: z.string(),
    isoCountry: z.string()
  }))).query(async ({ input, ctx }) => {
    const localPrisma = ctx.prisma.$extends({
      result: {
        airport: {
          priority: {
            needs: {
              type: true
            },
            compute(airport) {
              switch (airport.type) {
                case 'large_airport':
                  return 1;
                case 'medium_airport':
                  return 2;
                default:
                  return 3;
              }
            }
          }
        }
      }
    })

    const data = await localPrisma.airport.findMany({
      where: {
        icao: {
          startsWith: input.search
        }
      },
      select: {
        icao: true,
        name: true,
        isoCountry: true,
        priority: true,
      },
    })

    return orderBy(data, ['priority'], 'asc').map((d) => ({
      icao: d.icao,
      name: d.name,
      isoCountry: d.isoCountry
    }))
  })
})
