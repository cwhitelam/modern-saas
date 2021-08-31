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
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
    // ...add more providers here
  ],
  adapter: PrismaAdapter(prisma),
  debug: true,
  secret: 'secret',
  callbacks: {
    async redirect(url, baseUrl) {
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    async signIn(user, account, profile) {
      console.log('THIS IS FROM THE SIGNIN HOOK')
      console.log(user)
      console.log(account)
      console.log(profile)
      console.log('ENDTHIS IS FROM THE SIGNIN HOOK')
      return true
    },
    async session(session, user) {
      console.log('LOGGING SESSSSSIONNNN')
      console.log(session)
      console.log('END LOGGING SESSSSSIONNNN')
      session.user.roles = ['ADMIN']
      return session
    },
    async jwt(token, user, account, profile, isNewUser) {
      return token
    }
  }
})
