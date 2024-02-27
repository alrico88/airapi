// https://nitro.unjs.io/config
export default defineNitroConfig({
  runtimeConfig: {
    baseUrl: '/api',
  },
  imports: {
    autoImport: true,
    dirs: ['./helpers/**'],
  },
  routeRules: {
    '/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  },
});
