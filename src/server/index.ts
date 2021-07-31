import handlers from './handlers'

export default function (app: any, opts: any, next: any) {
  app.register(handlers, { prefix: '/api' })

  next()
}
