import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { Server } from 'socket.io'
import events from './events'

export default function (app: FastifyInstance, opts: FastifyPluginOptions, next: () => void) {
  app.after(() => {
    // Pass the raw node http server to the sockets
    // after the server is listening
    const io = new Server(app.server)
    global.io = io // expose io globally
    // register events
    events(app, io)
  })

  next()
}

