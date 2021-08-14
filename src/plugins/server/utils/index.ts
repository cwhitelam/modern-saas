import { randomBytes } from 'crypto'

export const randomId = randomBytes(16).toString('hex')
