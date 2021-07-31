import Fastify from 'fastify'
import next from './plugins/next'
import prisma from './plugins/prisma'
import server from './plugins/server'

export default async function app() {
  const app = Fastify({ logger: true, pluginTimeout: 20000 })
  console.log(app)

  // Encapsulate nextjs SSR implementation
  app.register(next)

  // Encapsulate backend sever implementation
  app.register(server)

  // Encapsulate orm / db implementation
  app.register(prisma)

  return app
}
