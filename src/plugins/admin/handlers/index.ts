import { FastifyError, FastifyInstance, FastifyPluginOptions, FastifyRequest } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { randomId } from '../../api/utils'
import user from './user'

export default function (app: FastifyInstance, opts: FastifyPluginOptions, next: () => void) {
  app.register(user, { prefix: '/user' })

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
