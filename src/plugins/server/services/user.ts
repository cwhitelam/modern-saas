import { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'

export default class UserService {
  _app: FastifyInstance
  constructor(app: FastifyInstance) {
    this._app = app
  }

  async createUser(email: string, name: string, password: string) {
    return await this._app.prisma.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hashSync(password, 10)
      }
    })
  }
}
