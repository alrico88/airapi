// https://nitro.unjs.io/config
export default defineNitroConfig({
  runtimeConfig: {
    baseUrl: '/api',
  },
  routeRules: {
    '**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  },
});
