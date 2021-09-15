import { FastifyError, FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export default function (
  app: FastifyInstance,
  opts = { authHost: `https://modern-saas-dev.herokuapp.com/`, herokuAppName: `modern-saas-dev` },
  next: () => void
) {
  const { authHost, herokuAppName } = opts
  app.addHook('onRequest', redirect)

  async function redirect(req: FastifyRequest, reply: FastifyReply) {
    const { hostname, url } = req
    if (hostname.startsWith(herokuAppName)) {
      await reply.redirect(301, `${authHost}${url}`)
    }
  }

  next()
}
