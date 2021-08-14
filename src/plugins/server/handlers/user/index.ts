import { FastifyInstance } from 'fastify'

export default function (app: FastifyInstance, opts: any, next: any) {
  app.get('/', async (request: any, reply: any) => {
    const getUser = await app.prisma.user.count()
    reply.send({ userCount: getUser })
  })

  app.post('/', (request: any, reply: any) => {
    reply.send({ route: 'Create User' })
  })
  next()
}
