import Fastify from 'fastify'
import fastifyNextjs from 'fastify-nextjs'
import handlers from './server/handlers'

export default async function app() {
  const app = Fastify({ logger: true, pluginTimeout: 20000 })

  app
    .register(fastifyNextjs, {
      logLevel: 'debug',
      noServeAssets: false
    })
    .after(() => {
      app.next('*')
    })

  app.register(handlers, { prefix: '/api' })

  return app
}
