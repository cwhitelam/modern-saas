import Fastify from 'fastify'
import next from './plugins/next/'
import server from './plugins/server/'

export default async function app() {
  const app = Fastify({ logger: true, pluginTimeout: 20000 })

  // Encapsulate nextjs SSR implementation
  app.register(next)

  // Encapsulate backend sever implementation
  app.register(server)

  return app
}
