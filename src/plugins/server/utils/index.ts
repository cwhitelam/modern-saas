import { randomBytes } from 'crypto'

export const isProduction = process.env.NODE_ENV === 'production'

export const randomId = (byteNum: number) => randomBytes(byteNum).toString('hex')
