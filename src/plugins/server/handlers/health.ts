export default function (app: any, opts: any, next: any) {
  app.get('/health', (request: any, reply: any) => {
    reply.send({ health: 'ok' })
  })
  next()
}
