import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import { HttpErrorReplys } from 'fastify-sensible/lib/httpError'
import { HttpErrors } from 'fastify-sensible/lib/httpError'
import { OpenAPIV3 } from 'openapi-types'
import next from './plugins/next'
import prisma from './plugins/prisma'
import server from './plugins/server'
import socket from './plugins/socket'

declare module 'fastify' {
  interface FastifyInstance {
    swagger: (opts?: { yaml?: boolean }) => OpenAPIV3.Document
    swaggerCSP: {
      script: string[]
      style: string[]
    }
    httpErrors: HttpErrors
  }
  interface FastifyRequest {
    user: any
  }
  interface FastifyReply extends HttpErrorReplys {}
}

export default async function app(options: FastifyServerOptions): Promise<FastifyInstance> {
  const app = Fastify(options)

  // Encapsulate nextjs SSR implementation
  app.register(next)

  // Encapsulate websocket events
  app.register(socket)

  // Encapsulate backend sever implementation
  app.register(server)

  // Encapsulate orm / db implementation
  app.register(prisma)

  return app
}
