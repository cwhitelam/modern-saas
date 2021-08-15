import { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'
import { PrismaErrorCodes } from '../../prisma/utils'
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import { randomId } from '../utils'

export default class AuthService {
  _app: FastifyInstance
  constructor(app: FastifyInstance) {
    this._app = app
  }

  public async signup(email: string, name: string, password: string) {
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

  public async signin(email: string, password: string) {
    const user = await this._app.prisma.user.findFirst({
      where: { email },
      include: {
        UserRole: {
          select: {
            role: true
          }
        }
      }
    })

    if (!user) {
      throw this._app.httpErrors.badRequest('Email or Password wrong. Please try again.')
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      throw this._app.httpErrors.badRequest('Email or Password wrong. Please try again.')
    }

    const accessToken = jwt.sign(
      _.pick(user, ['uuid', 'UserRole']),
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1hr'
      }
    )
    const refreshToken = await this.generateAndStoreRefreshToken(user)

    return { accessToken, refreshToken }
  }

  private async generateAndStoreRefreshToken(user) {
    const token = randomId(32)

    await this._app.prisma.userToken.upsert({
      where: {
        userId: user.id
      },
      update: {
        updatedAt: new Date(Date.now())
      },
      create: {
        userId: user.id,
        token
      }
    })
    return token
  }
}
