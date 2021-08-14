import { FastifyInstance } from 'fastify'
import UserService from '../../services/user'
import { signup } from './schema'

export default function (app: FastifyInstance, opts: any, next: any) {
  const userService = new UserService(app)

  app.route({
    method: 'POST',
    schema: signup,
    url: '/signup',
    handler: async (request: any, reply: any) => {
      const { email, name, password } = request.body
      const signup = await userService.createUser(email, name, password)

      reply.send(signup)
    }
  })

  next()
}
