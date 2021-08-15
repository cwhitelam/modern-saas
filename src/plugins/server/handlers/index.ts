import health from './health'
import user from './user'
import auth from './auth'
import { randomId } from '../utils'
import { FastifyError, FastifyRequest } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'

export default function (app: any, opts: any, next: any) {
  app.register(health, { prefix: '/health' })
  app.register(user, { prefix: '/user' })
  app.register(auth, { prefix: '/auth' })

  app.setErrorHandler((err: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    const customErr = {
      errorId: randomId(16),
      statusCode: err.statusCode || 500,
      error: err.name || 'InternalServerError',
      message: err.message ? err.message : 'Unexpected error'
    }
    // Provide some logging here
    // or tunnel errors to a platform
    reply.send(customErr)
  })

  next()
}
