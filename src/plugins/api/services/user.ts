import { FastifyInstance } from 'fastify'

export default class UserService {
  private _app: FastifyInstance
  constructor(app: FastifyInstance) {
    this._app = app
  }

  public async testFunc(): Promise<boolean> {
    return true
  }
}
