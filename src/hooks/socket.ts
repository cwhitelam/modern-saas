import { io, Socket } from 'socket.io-client'

const socket = io()

export function useSocket(): Socket {
  return socket
}

export function useEvent(evt: string, cb: () => any) {
  socket.on(evt, (payload: any) => cb(payload))
}
