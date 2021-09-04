import { isProduction } from '@utils/constants'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { FastifyCookieOptions } from 'fastify-cookie'
import handlers from './handlers'

export default function (app: FastifyInstance, opts: FastifyPluginOptions, next: () => void) {
  app.register(require('fastify-swagger'), {
    routePrefix: '/api/admin/docs',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Modern SaaS admin api'
      }
    }
  })

  app.register(handlers, { prefix: '/api/admin' })

  app.ready((err) => {
    if (err) throw err
    app.swagger()
  })

  next()
}
