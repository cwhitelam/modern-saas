import { FastifyInstance } from 'fastify'
import { makeSchema, objectType } from 'nexus'
import { Context } from './'
import { User, Account } from 'nexus-prisma'

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
  name: User.$name,
  definition(t) {
    t.field(User.id)
    t.field(User.name)
    t.field(User.email)
    t.field(User.blocked)
    t.field(User.accounts)
  }
})

const AccountType = objectType({
  name: Account.$name,
  definition(t) {
    t.field(Account.id)
    t.field(Account.providerId)
    t.field(Account.user)
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
