import { FastifyInstance } from 'fastify'
import handlers from './handlers'

export default function (app: FastifyInstance, opts: any, next: any) {
  app.register(require('fastify-sensible'))

  app.register(require('fastify-swagger'), {
    routePrefix: '/api/docs',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Modern SaaS'
      }
    }
  })

  app.register(handlers, { prefix: '/api' })

  app.ready((err) => {
    if (err) throw err

    if (process.env.NODE_ENV !== 'production') {
      app.swagger()
    }
  })

  next()
}
