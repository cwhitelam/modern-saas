import { FastifyInstance } from 'fastify'

export default function (app: FastifyInstance, opts: any, next: any) {
  app.get('/', async (request: any, reply: any) => {
    reply.send({ userCount: 0 })
  })

  app.post('/', (request: any, reply: any) => {
    reply.send({ route: 'Create User' })
  })
  next()
}
