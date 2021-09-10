import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify'

export default function (app: FastifyInstance, opts: FastifyPluginOptions, next: () => void) {
  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const users = await app.prisma.user.findMany({
      include: { accounts: true, sessions: true }
    })
    reply.send(users)
  })

  next()
}
