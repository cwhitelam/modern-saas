import crypto from 'crypto'

export const randomId = crypto.randomBytes(16).toString('hex')
