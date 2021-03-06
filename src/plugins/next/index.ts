import { FastifyError, FastifyInstance } from 'fastify'
import fastifyNextjs from 'fastify-nextjs'

export default function (app: FastifyInstance, opts: any, next: () => void) {
  app.addContentTypeParser('application/x-www-form-urlencoded', async (_, payload) => payload)

  app
    .register(fastifyNextjs, {
      logLevel: 'debug',
      noServeAssets: false
    })
    .after((e: FastifyError) => {
      if (e) {
        console.log(e)
        process.exit(1)
      }
      app.next('*', { method: 'GET', schema: {} })
      // Whitelist POST routes from next API endpoints
      // This is a specific configuration for Fastify
      app.next('/api/auth/signin/google', { method: 'POST', schema: {} })
      app.next('/api/auth/signout', { method: 'POST', schema: {} })
    })

  next()
}
