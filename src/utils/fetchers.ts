import axios from 'axios'

const internalInstance = axios.create({
  baseURL: process.env.SERVER_URL
})

export const internalFetcher = async (method: string, url: string) => {
  return await internalInstance[method](url)
}
