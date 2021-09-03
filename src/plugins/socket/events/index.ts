import { FastifyInstance } from 'fastify'
import { Socket, Server } from 'socket.io'

declare module 'socket.io' {
  interface Socket {
    ip: any
  }
}

export default function (app: FastifyInstance, io: Server) {
  io.on('connection', (socket: Socket) => {
    socket.ip = socket.handshake.headers['x-real-ip'] || socket.request.connection.remoteAddress

    console.log(`${socket.ip} connected from somewhere`)
    // Setup some event modules...
  })
}
