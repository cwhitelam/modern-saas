import health from './health'
import user from './user'

export default function (app: any, opts: any, next: any) {
  app.register(health, { prefix: '/' })
  app.register(user, { prefix: '/user' })

  next()
}
