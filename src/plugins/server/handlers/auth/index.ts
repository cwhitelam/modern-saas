import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import AuthService from '../../services/auth'
import { authGuard, roleGuard } from '../../utils/guards'
import { signup, signin, token } from './schema'

export default function (app: FastifyInstance, opts: FastifyPluginOptions, next: () => void) {
  const authService = new AuthService(app)

  app.route({
    method: 'POST',
    schema: signup,
    url: '/signup',
    handler: async (request: any, reply: any) => {
      const { email, name, password } = request.body
      const signup = await authService.signup(email, name, password)

      reply.code(201).send(signup)
    }
  })

  app.route({
    method: 'POST',
    schema: signin,
    url: '/signin',
    handler: async (request: any, reply: any) => {
      const { email, password } = request.body
      const signin = await authService.signin(email, password)

      reply
        .setCookie('accessToken', signin.accessToken, {
          secure: false,
          httpOnly: true,
          path: '/'
        })
        .setCookie('refreshToken', signin.refreshToken, {
          secure: false,
          httpOnly: true,
          path: '/'
        })
        .send(signin)
    }
  })

  app.route({
    method: 'POST',
    schema: token,
    url: '/token',
    preHandler: [authGuard],
    handler: async (request: any, reply: any) => {
      const { refreshToken } = request.body
      const token = await authService.token(refreshToken)

      reply
        .setCookie('accessToken', token.accessToken, {
          secure: false,
          httpOnly: true,
          path: '/'
        })
        .send(token)
    }
  })

  app.route({
    method: 'GET',
    url: '/profile',
    preHandler: [authGuard, roleGuard('ADMIN')],
    handler: async (request: any, reply: any) => {
      const profile = await authService.profile(request.user.id)

      reply.send(profile)
    }
  })

  next()
}
