import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { FastifyCookieOptions } from 'fastify-cookie'
import handlers from './handlers'

export default function (app: FastifyInstance, opts: FastifyPluginOptions, next: () => void) {
  app.register(require('fastify-sensible'))
  app.register(require('fastify-cookie'), {} as FastifyCookieOptions)
  app.register(require('fastify-cors'), { origin: true })

  app.register(require('fastify-swagger'), {
    routePrefix: '/api/docs',
    exposeRoute: process.env.NODE_ENV !== 'production',
    swagger: {
      info: {
        title: 'Modern SaaS'
      }
    }
  })

  app.register(handlers, { prefix: '/api' })

  app.ready((err) => {
    if (err) throw err
    app.swagger()
  })

  next()
}
