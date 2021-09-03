import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { PrismaClient } from '@prisma/client'
import Adapters from 'next-auth/adapters'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

declare module 'next-auth' {
  interface User {
    roles: string[]
  }

  interface Session {
    user: User
  }
}

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === 'production' ? false : true,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn(user, account, profile) {
      // fetch user roles
      return true
    },
    async session(session, user) {
      session.user.roles = ['ADMIN']
      return session
    },
    async jwt(token, user, account, profile, isNewUser) {
      return token
    }
  }
})
