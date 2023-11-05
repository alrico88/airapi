import { IncomingMessage } from 'http'
import { createOpenApiHttpHandler } from 'trpc-openapi'

import { appRouter } from '../../trpc/router'

const normalizePath = (path: string) => {
  return `/${path.replace(/^\/|\/$/g, '')}`
}

type NuxtRequest = IncomingMessage & {
  query?: ReturnType<typeof getQuery>;
};

const openApiHttpHandler = createOpenApiHttpHandler({
  router: appRouter
})

export default defineEventHandler(async (event) => {
  let pathname: string | null = null

  const params = event.context.params
  if (params && params?.trpc) {
    if (!params.trpc.includes('/')) {
      pathname = params.trpc
    } else {
      pathname = params.trpc
    }
  }

  (event.node.req as NuxtRequest).query = getQuery(event)
  event.node.req.url = normalizePath(pathname)
  await openApiHttpHandler(event.node.req, event.node.res)
})
