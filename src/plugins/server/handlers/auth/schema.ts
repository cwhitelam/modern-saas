export const signup = {
  description: 'auth/signup',
  tags: ['auth'],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      name: { type: 'string' },
      password: {
        type: 'string',
        pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
      }
    },
    required: ['email', 'name', 'password']
  },
  response: {
    201: {
      description: 'success',
      type: 'object',
      properties: {
        uuid: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' }
      }
    }
  }
}

export const signin = {
  description: 'auth/signin',
  tags: ['auth'],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' }
    },
    required: ['email', 'password']
  },
  response: {
    200: {
      description: 'success',
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' }
      }
    }
  }
}

export const token = {
  description: 'auth/token',
  tags: ['auth'],
  body: {
    type: 'object',
    properties: {
      refreshToken: { type: 'string' }
    },
    required: ['email', 'password']
  },
  response: {
    200: {
      description: 'success',
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' }
      }
    }
  }
}
