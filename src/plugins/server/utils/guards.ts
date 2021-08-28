import { FastifyRequest } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import jwt from 'jsonwebtoken'

export const roleGuard = (role: string) => {
  return function (request: FastifyRequest, reply: FastifyReply, next: () => void): void {
    let hasPermission = false

    if (request.user.roles.length < 1) {
      reply.forbidden('Missing required role')
    }

    request.user.roles.forEach((role: string) => {
      if (role.toUpperCase() === role) {
        return (hasPermission = true)
      }
    })

    if (hasPermission) {
      next()
    } else {
      reply.forbidden('Missing required role')
    }
  }
}

export const authGuard = (request: FastifyRequest, reply: FastifyReply, next: () => void) => {
  try {
    console.log('******************')
    console.log(request.cookies)
    console.log('******************')
    const accessToken = request.cookies?.accessToken

    if (!accessToken) {
      throw Error('No token')
    }

    const validToken = verifyToken(accessToken, request, reply, next)

    if (validToken) {
      const user = jwt.decode(accessToken)
      request.user = user
      return next()
    }

    reply.internalServerError('Something went wrong')
  } catch (err) {
    reply.send(err)
  }
}

const verifyToken = (
  accessToken: string,
  request: FastifyRequest,
  reply: FastifyReply,
  next: () => void
) => {
  try {
    const validToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    return validToken
  } catch (err) {
    reply.clearCookie('accessToken')
    reply.clearCookie('refreshToken')
    reply.unauthorized('Token expired')
  }
}
