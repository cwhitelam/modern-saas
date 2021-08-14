import { FastifyInstance } from 'fastify'
import handlers from './handlers'

export default function (app: FastifyInstance, opts: any, next: any) {
  app.register(require('fastify-sensible'))

  app.register(handlers, { prefix: '/api' })

  next()
}
