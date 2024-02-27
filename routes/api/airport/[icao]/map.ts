import StaticMaps from 'staticmaps';
import { mimes } from 'mrmime';

export default defineEventHandler<{
  query: {
    width?: string;
    height?: string;
    zoom?: string;
  };
}>(async (event) => {
  const icao = getRouterParam(event, 'icao');
  const { width = 500, height = 500, zoom = 10 } = getQuery(event);

  const data = await prisma.airport.findFirst({
    where: {
      icao,
    },
    select: {
      id: true,
      icao: true,
      latitude: true,
      longitude: true,
    },
  });

  if (!data) {
    return createError({
      statusCode: 404,
      message: 'Airport not found',
    });
  }

  const markerOpts = {
    height: 41,
    width: 25,
    img: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    offsetX: 12.5,
    offsetY: 41,
  };

  const map = new StaticMaps({
    width: Number(width),
    height: Number(height),
  });

  map.addMarker({
    ...markerOpts,
    coord: [data.longitude, data.latitude],
  });

  map.addText({
    coord: [data.longitude, data.latitude],
    text: data.icao,
    offsetX: markerOpts.offsetX,
    offsetY: -10,
  });

  await map.render([data.longitude, data.latitude], Number(zoom));

  setHeader(event, 'Content-Type', mimes.png);

  return map.image.buffer() as any;
});
