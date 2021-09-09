import { isProduction } from '@utils/constants'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import handlers from './handlers'
import services from './services'

export default function (app: FastifyInstance, opts: FastifyPluginOptions, next: () => void) {
  app.register(require('fastify-swagger'), {
    routePrefix: '/api/docs',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Modern SaaS app api'
      }
    }
  })

  app.decorate('services', {
    ...services
  })

  app.register(handlers, { prefix: '/api' })

  app.ready((err) => {
    if (err) throw err
    app.swagger()
  })

  next()
}
