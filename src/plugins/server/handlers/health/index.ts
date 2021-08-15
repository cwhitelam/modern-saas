import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default function (app: FastifyInstance, opts: FastifyPluginOptions, next: () => void) {
  app.get('/', (request: any, reply: any) => {
    reply.send({ health: 'ok' })
  })
  next()
}
