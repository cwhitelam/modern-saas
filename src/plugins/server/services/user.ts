import { FastifyInstance } from 'fastify'

export default class UserService {
  _app: FastifyInstance
  constructor(app: FastifyInstance) {
    this._app = app
  }
}
