import { isProduction } from '@utils/constants'
import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import { HttpErrorReplys } from 'fastify-sensible/lib/httpError'
import { HttpErrors } from 'fastify-sensible/lib/httpError'
import { OpenAPIV3 } from 'openapi-types'
import { IServices } from '@plugins/api/services'
import next from '@plugins/next'
import api from '@plugins/api'
import admin from '@plugins/admin'
import prisma from '@plugins/prisma'
import graphql from '@plugins/graphql'

declare module 'fastify' {
  interface FastifyInstance {
    swagger: (opts?: { yaml?: boolean }) => OpenAPIV3.Document
    swaggerCSP: {
      script: string[]
      style: string[]
    }
    httpErrors: HttpErrors
    services: IServices
  }
  interface FastifyRequest {
    user: any
  }
  interface FastifyReply extends HttpErrorReplys {
    sendFile(filename: string, rootPath?: string): FastifyReply
  }
}

export default async function app(options: FastifyServerOptions): Promise<FastifyInstance> {
  const app = Fastify(options)

  // Common dependencies
  app.register(require('fastify-sensible'))

  // Encapsulate nextjs SSR implementation
  app.register(next)

  // Encapsulate backend api implementation
  app.register(api)

  // Encapsulate backend admin api implementation
  app.register(admin)

  // Encapsulate nextjs SSR implementation
  app.register(graphql)

  // Encapsulate orm / db implementation
  app.register(prisma)

  return app
}
