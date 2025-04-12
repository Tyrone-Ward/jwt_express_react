import axios from 'axios'

export const authApi = axios.create({
  baseURL: `/auth`
})

const authDataApi = axios.create({
  baseURL: `/auth`,
  headers: {
    'Content-Type': 'application/json'
  }
})

authDataApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default authDataApi
