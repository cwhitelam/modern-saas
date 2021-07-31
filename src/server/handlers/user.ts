export default function (app: any, opts: any, next: any) {
  app.get('/', (request: any, reply: any) => {
    reply.send({ route: 'Get User' })
  })
  app.post('/', (request: any, reply: any) => {
    reply.send({ route: 'Create User' })
  })
  next()
}
