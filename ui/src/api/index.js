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
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
// TODO: use refreshToken to issue a new accessToken. Silently request new token in the event of a 401 error
authApi.interceptors.response.use(
  function (response) {
    console.log('refreshToken:', response.headers.authorization)
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default authDataApi
