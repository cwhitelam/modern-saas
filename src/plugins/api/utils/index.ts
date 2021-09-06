import { randomBytes } from 'crypto'

export const randomId = (byteNum: number) => randomBytes(byteNum).toString('hex')
