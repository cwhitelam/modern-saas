import { FastifyInstance } from 'fastify'
import { makeSchema, objectType } from 'nexus'
import { Context } from './'

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allUsers', {
      type: 'User',
      resolve: async (_parent, args, context, info) => {
        const users = await context.prisma.user.findMany()
        return users
      }
    })
  }
})

const UserType = objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('email')
    t.boolean('blocked')
    t.list.field('accounts', {
      type: AccountType,
      resolve(root, args, ctx) {
        return ctx.prisma.account.findMany({ where: { userId: root.id } })
      }
    })
  }
})

const AccountType = objectType({
  name: 'Account',
  definition(t) {
    t.string('id')
    t.string('userId')
    t.string('providerId')
  }
})

export const schema = makeSchema({
  types: [Query, UserType, AccountType],
  outputs: {
    schema: __dirname + '/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts'
  },
  contextType: {
    module: require.resolve('./'),
    export: 'Context'
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma'
      }
    ]
  }
})
