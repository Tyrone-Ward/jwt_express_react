import axios from 'axios'

export const authApi = axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/auth`
})

const api = axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_BACKEND_PORT}`,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api
