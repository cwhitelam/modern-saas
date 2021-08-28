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

  public async profile(userId) {
    const profile = await this._app.prisma.user.findFirst({
      where: {
        id: userId
      }
    })

    return profile
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

    const userTokenData = this.prepareUserForToken(user)

    console.log(userTokenData)
    const accessToken = await this.generateAccessToken(userTokenData)
    const refreshToken = await this.generateAndStoreRefreshToken(user)

    return { accessToken, refreshToken }
  }

  public async token(refreshToken: string) {
    const token = await this._app.prisma.userToken.findFirst({
      where: { token: refreshToken }
    })

    if (!token) {
      throw this._app.httpErrors.unauthorized(
        'The provided refresh token is invalid, expired, or revoked.'
      )
    }

    const checkToken = await bcrypt.compare(token.token, refreshToken)

    const user = await this._app.prisma.user.findFirst({
      where: { id: token.userId },
      include: {
        UserRole: {
          select: {
            role: true
          }
        }
      }
    })

    return {
      accessToken: this.generateAccessToken(user)
    }
  }

  private prepareUserForToken(user) {
    const roles = user.UserRole.map((role) => role.role.role)
    return {
      userId: user.uuid,
      roles
    }
  }

  private async generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: 60 * 5 // 5mins
    })
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
