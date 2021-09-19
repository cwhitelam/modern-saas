import { PrismaClient } from '@prisma/client'
import { isProduction } from '@utils/constants'
import { schema } from './schema'
import { FastifyRequest, FastifyReply, FastifyInstance, FastifyPluginOptions } from 'fastify'

export interface Context {
  prisma: PrismaClient
  request: FastifyRequest
  reply: FastifyReply
}

export default function (app: FastifyInstance, opts: FastifyPluginOptions, next: () => void) {
  app.register(require('mercurius'), {
    schema,
    path: '/graphql',
    graphiql: false,
    context: (request: FastifyRequest, reply: FastifyReply): Context => {
      return {
        prisma: app.prisma,
        request,
        reply
      }
    }
  })

  const enabled = () => {
    if (isProduction) {
      return {}
    } else {
      return {
        path: '/altair',
        baseURL: '/altair/'
      }
    }
  }

  app.register(require('altair-fastify-plugin'), {
    ...enabled(),
    endpointURL: '/graphql',
    initialSettings: {
      theme: 'dark',
      plugin: {
        list: ['altair-graphql-plugin-graphql-explorer']
      }
    }
  })

  next()
}
