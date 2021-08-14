import { FastifyInstance } from 'fastify'
import app from './app'

const port = process.env.PORT || 3000
const host = '0.0.0.0'

let server: FastifyInstance

const startServer = async () => {
  try {
    server = await app({ logger: true, pluginTimeout: 20000 })

    await server.listen(port, host)

    server.log.info(`🚀 Modern-SaaS is now running on port ${port}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

startServer()

//export const viteNodeApp = app({ logger: true, pluginTimeout: 20000 })
