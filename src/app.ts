import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import next from './plugins/next'
import prisma from './plugins/prisma'
import server from './plugins/server'

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
