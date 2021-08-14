import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import { HttpErrors } from 'fastify-sensible/lib/httpError'
import next from './plugins/next'
import prisma from './plugins/prisma'
import server from './plugins/server'

declare module 'fastify' {
  interface FastifyInstance {
    httpErrors: HttpErrors
  }
}

export default async function app(options: FastifyServerOptions): Promise<FastifyInstance> {
  const app = Fastify(options)

  // Encapsulate nextjs SSR implementation
  app.register(next)

  // Encapsulate backend sever implementation
  app.register(server)

  // Encapsulate orm / db implementation
  app.register(prisma)

  return app
}
