import { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'
import { PrismaErrorCodes } from '../../prisma/utils'

export default class UserService {
  _app: FastifyInstance
  constructor(app: FastifyInstance) {
    this._app = app
  }

  async createUser(email: string, name: string, password: string) {
    try {
      const createUser = await this._app.prisma.user.create({
        data: {
          email,
          name,
          password: bcrypt.hashSync(password, 10)
        }
      })
      return createUser
    } catch (err) {
      if (err.code === PrismaErrorCodes.UniqueConstraint) {
        throw this._app.httpErrors.badRequest('Unable to create account. Please try again.')
      }
      throw this._app.httpErrors.internalServerError('Something went wrong.')
    }
  }
}
