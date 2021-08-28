import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
    // ...add more providers here
  ],
  secret: 'secret',
  callbacks: {
    async redirect(url, baseUrl) {
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    async signIn(user, account, profile) {
      return true
    },
    async session(session, user) {
      return session
    },
    async jwt(token, user, account, profile, isNewUser) {
      return token
    }
  }
})
