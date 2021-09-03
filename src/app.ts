import { isProduction } from '@utils/constants'
import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import { HttpErrorReplys } from 'fastify-sensible/lib/httpError'
import { HttpErrors } from 'fastify-sensible/lib/httpError'
import { OpenAPIV3 } from 'openapi-types'
import next from './plugins/next'
import prisma from './plugins/prisma'
import app from './plugins/app'
import admin from './plugins/admin'

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

export default async function ModernSaas(options: FastifyServerOptions): Promise<FastifyInstance> {
  const modernSaas = Fastify(options)

  // Common dependencies
  modernSaas.register(require('fastify-sensible'))

  // Encapsulate nextjs SSR implementation
  modernSaas.register(next)

  // Encapsulate backend app implementation
  modernSaas.register(app)

  // Encapsulate backend admin implementation
  modernSaas.register(admin)

  // Encapsulate orm / db implementation
  modernSaas.register(prisma)

  return modernSaas
}
