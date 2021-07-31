import { FastifyError } from 'fastify'
import fastifyNextjs from 'fastify-nextjs'

export default function (app: any, opts: any, next: any) {
  app
    .register(fastifyNextjs, {
      logLevel: 'debug',
      noServeAssets: false
    })
    .after((e: FastifyError) => {
      if (e) {
        console.log(e)
      }
      app.next('*')
    })

  next()
}
