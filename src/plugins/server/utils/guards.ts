import { FastifyRequest } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import jwt from 'jsonwebtoken'

export const roleGuard = (role: string) => {
  return function (request: FastifyRequest, reply: FastifyReply, next: () => void): void {
    let hasPermission = false

    if (request.user.UserRole.length < 1) {
      reply.forbidden('Missing required role')
    }

    request.user.UserRole.forEach(({ role: { role } }) => {
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
    const accessToken = request.headers.authorization?.split(' ')[1]

    if (!accessToken) {
      throw Error('No token')
    }

    const validToken = verifyToken(accessToken, reply)

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

const verifyToken = (accessToken: string, reply: FastifyReply) => {
  try {
    const validToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    return validToken
  } catch (err) {
    reply.unauthorized('Token expired')
  }
}
