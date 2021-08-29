import axios, { AxiosInstance } from 'axios'

const SERVICE_URL =
  process.env.NODE_ENV === 'production' ? process.env.DEPLOYED_URL : process.env.LOCAL_URL

const internalInstance: AxiosInstance = axios.create({
  baseURL: SERVICE_URL,
  withCredentials: true
})

internalInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export const internalFetcher = async (method: string, url: string, body?: any, config?: any) => {
  try {
    if (method == 'get' || method == 'delete') {
      console.log(config)
      return await internalInstance[method](SERVICE_URL + url, config)
    }
    return await internalInstance[method](SERVICE_URL + url, body, config)
  } catch (err) {
    console.log(err)
    const error = err.response.data
    throw error
  }
}
