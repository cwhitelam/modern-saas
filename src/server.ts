import { FastifyInstance } from 'fastify'
import ModernSaas from './app'

const port = process.env.PORT || 3000
const host = '0.0.0.0'

let server: FastifyInstance

const startServer = async () => {
  try {
    server = await ModernSaas({ logger: true, pluginTimeout: 20000 })

    await server.listen(port, host)

    server.log.info(`🚀 Modern-SaaS is now running on port ${port}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

startServer()

//if (process.env.NODE_EV === 'production') {
// startServer()
//}

//export const START_THE_ROCKET_SHIP = ModernSaas({ logger: true, pluginTimeout: 20000 })
