import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default function (app: FastifyInstance, opts: FastifyPluginOptions, next: () => void) {
  app.get('/', async (request: any, reply: any) => {
    const users = await app.prisma.user.findMany({
      include: { accounts: true, sessions: true }
    })
    reply.send(users)
  })

  app.post('/', (request: any, reply: any) => {
    reply.send({ route: 'Create User' })
  })
  next()
}
