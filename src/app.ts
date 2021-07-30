import Fastify from 'fastify'
import fastifyNextjs from 'fastify-nextjs'

export default async function app() {
  const app = Fastify({ logger: true, pluginTimeout: 20000 })

  app
    .register(fastifyNextjs, {
      logLevel: 'debug',
      noServeAssets: false
    })
    .after(() => {
      app.next('/')
    })

  app.get('/health', async () => {
    return { ok: true }
  })

  return app
}
