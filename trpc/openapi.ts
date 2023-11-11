import { generateOpenApiDocument } from 'trpc-openapi';

import { appRouter } from './router';

const config = useRuntimeConfig();

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'AirAPI',
  description: 'API Documentation for AirAPI, the free hobby aviation API',
  version: '1.0.0',
  baseUrl: config.baseUrl,
  docsUrl: 'https://github.com/alrico88/airapi',
  tags: [],
});
