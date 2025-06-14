import { useSetUserName, useSetUserId, useSetUserRole, useSetIsLoggedIn } from '../stores/auth/auth.store.js'
import { jwtDecode } from 'jwt-decode'
import { authApi } from '../api'
import { toast } from 'react-toastify'

export const useLogin = () => {
  const setUsername = useSetUserName()
  const setUserId = useSetUserId()
  const setUserRole = useSetUserRole()
  const isLoggedIn = useSetIsLoggedIn()

  const login = async (email, password) => {
    try {
      const response = await authApi.post('/login', {
        email,
        password
      })

      if (response.status === 200) {
        // Handle successful login, e.g., set username, role, etc
        const accessToken = response.data.accessToken
        const refreshToken = response.data.refreshToken
        const decoded = jwtDecode(accessToken)
        console.log(decoded)
        setUsername(decoded.username)
        setUserId(decoded.id)
        setUserRole(decoded.role)
        isLoggedIn(true)
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
      }
    } catch (error) {
      if (error.status === 400) {
        console.log(error)
        toast.error('Wrong username and/or password.')
      } else {
        console.log(error)
      }
    }
  }

  return { login }
}
