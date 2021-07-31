import Fastify from 'fastify'
import fastifyNextjs from 'fastify-nextjs'
import server from './server/'

export default async function app() {
  const app = Fastify({ logger: true, pluginTimeout: 20000 })

  app
    .register(fastifyNextjs, {
      logLevel: 'debug',
      noServeAssets: false
    })
    .after((e) => {
      console.log(e)
      app.next('*')
    })

  // Encapsulate backend sever implementation
  app.register(server)

  return app
}
