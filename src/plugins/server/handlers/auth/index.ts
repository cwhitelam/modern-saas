import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import AuthService from '../../services/auth'
import { signup, signin } from './schema'

export default function (app: FastifyInstance, opts: FastifyPluginOptions, next: () => void) {
  const authService = new AuthService(app)

  app.route({
    method: 'POST',
    schema: signup,
    url: '/signup',
    handler: async (request: any, reply: any) => {
      const { email, name, password } = request.body
      const signup = await authService.signup(email, name, password)

      reply.code(201).send(signup)
    }
  })

  app.route({
    method: 'POST',
    schema: signin,
    url: '/signin',
    handler: async (request: any, reply: any) => {
      const { email, password } = request.body
      const signin = await authService.signin(email, password)

      reply.send(signin)
    }
  })

  next()
}
