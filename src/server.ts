import { FastifyInstance } from 'fastify'
import app from './app'

const port = Number(process.env.PORT) || 3000

let server: FastifyInstance

const startServer = async () => {
  try {
    server = await app({ logger: true, pluginTimeout: 20000 })

    await server.listen(port)

    server.log.info(`🚀 Modern-SaaS is now running on port ${port}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

startServer()
