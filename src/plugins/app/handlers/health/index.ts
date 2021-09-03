import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { health } from './schema'

export default function (app: FastifyInstance, opts: FastifyPluginOptions, next: () => void) {
  app.route({
    method: 'GET',
    schema: health,
    url: '/',
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      reply.send({ health: 'ok' })
    }
  })
  next()
}
