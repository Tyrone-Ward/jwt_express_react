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
authDataApi.interceptors.response.use(
  (response) => response, // Directly return successful responses.
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // Mark the request as retried to avoid infinite loops.
      try {
        const refreshToken = localStorage.getItem('refreshToken') // Retrieve the stored refresh token.
        // Make a request to your auth server to refresh the token.
        const response = await axios.post('/refresh', {
          refreshToken
        })
        const { accessToken, refreshToken: newRefreshToken } = response.data
        // Store the new access and refresh tokens.
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', newRefreshToken)
        // Update the authorization header with the new access token.
        authDataApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        return authDataApi(originalRequest) // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error('Token refresh failed:', refreshError)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error) // For all other errors, return the error as is.
  }
)

export default authDataApi
