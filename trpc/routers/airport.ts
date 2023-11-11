import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../trpc';

export const airportRouter = router({
  airport: publicProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: '/airport/{icao}',
        tags: ['airport']
      },
    })
    .input(
      z.object({
        icao: z.string(),
      })
    )
    .output(
      z.object({
        id: z.number(),
        icao: z.string(),
        latitude: z.number(),
        longitude: z.number(),
        country: z.string(),
        name: z.string(),
        elevation: z.number(),
        runwayCount: z.number(),
        municipality: z.string(),
        runways: z
          .object({
            ident: z.string(),
            bearing: z.number(),
            surface: z.string().optional(),
            length: z.number().optional(),
            width: z.number().optional(),
          })
          .array(),
      })
    )
    .query(async ({ input, ctx }) => {
      const data = await ctx.prisma.airport.findFirst({
        where: {
          icao: input.icao,
        },
        select: {
          id: true,
          icao: true,
          name: true,
          latitude: true,
          longitude: true,
          isoCountry: true,
          municipality: true,
          elevation: true,
          Runway: true,
        },
      });

      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Airport not found',
        });
      }

      return {
        id: data.id,
        icao: data.icao,
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        country: data.isoCountry,
        elevation: data.elevation,
        municipality: data.municipality,
        runwayCount: data.Runway.length,
        runways: data.Runway.reduce((acc, item) => {
          if (item.leIdent && item.leHeading) {
            acc.push({
              ident: item.leIdent,
              bearing: item.leHeading,
              surface: item.surface,
              length: item.length,
              width: item.width,
            });
          }

          if (item.heIdent && item.heHeading) {
            acc.push({
              ident: item.heIdent,
              bearing: item.heHeading,
              surface: item.surface,
              length: item.length,
              width: item.width,
            });
          }

          return acc;
        }, []),
      };
    }),
  runways: publicProcedure.meta({
    openapi: {
      path: '/airport/{icao}/runways',
      method: 'GET',
      tags: ['airport']
    }
  }).input(z.object({
    icao: z.string()
  })).output(z
    .object({
      ident: z.string(),
      bearing: z.number(),
      surface: z.string().optional(),
      length: z.number().optional(),
      width: z.number().optional(),
    })
    .array()).query(async ({ input, ctx }) => {
    const data = await ctx.prisma.runway.findMany({
      where: {
        airportIdent: input.icao
      }
    })

    if (data.length === 0) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No runways found for provided ICAO'
      })
    }

    return data.reduce((acc, item) => {
      if (item.leIdent && item.leHeading) {
        acc.push({
          ident: item.leIdent,
          bearing: item.leHeading,
          surface: item.surface,
          length: item.length,
          width: item.width,
        });
      }

      if (item.heIdent && item.heHeading) {
        acc.push({
          ident: item.heIdent,
          bearing: item.heHeading,
          surface: item.surface,
          length: item.length,
          width: item.width,
        });
      }

      return acc;
    }, []);
  })
});
