import { FastifyInstance } from 'fastify'
import { PrismaErrorCodes } from 'src/plugins/prisma/utils'
import UserService from '../../services/user'
import { signup } from './schema'

export default function (app: FastifyInstance, opts: any, next: any) {
  const userService = new UserService(app)

  app.route({
    method: 'POST',
    schema: signup,
    url: '/signup',
    handler: async (request: any, reply: any) => {
      try {
        const { email, name, password } = request.body
        const signup = await userService.createUser(email, name, password)
        reply.send(signup)
      } catch (err) {
        if (err.code === PrismaErrorCodes.UniqueConstraint) {
          throw app.httpErrors.badRequest('Unable to create account. Please try again.')
        }
        throw app.httpErrors.internalServerError('Something went wrong.')
      }
    }
  })

  next()
}
