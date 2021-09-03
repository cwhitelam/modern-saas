export const health = {
  description: 'health',
  tags: ['health'],
  response: {
    200: {
      description: 'success',
      type: 'object',
      properties: {
        health: { type: 'string' }
      }
    }
  }
}
