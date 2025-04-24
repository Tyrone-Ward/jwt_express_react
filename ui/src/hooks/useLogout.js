import { useSetUserName, useSetUserId, useSetUserRole, useSetIsLoggedIn } from '../stores/auth/auth.store.js'
import { authApi } from '../api'
import { toast } from 'react-toastify'

export const useLogout = () => {
  const setUsername = useSetUserName()
  const setUserId = useSetUserId()
  const setUserRole = useSetUserRole()
  const isLoggedIn = useSetIsLoggedIn()

  const logout = async () => {
    const refreshToken = localStorage.getItem(refreshToken)
    try {
      // TODO: use DELETE method
      const response = await authApi.post('/logout', {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })

      if (response.status === 200) {
        // Handle successful login, e.g., set username, role, etc
        setUsername(null)
        setUserId(null)
        setUserRole(null)
        isLoggedIn(false)
        localStorage.removeItem('accessToken')
        localStorage.remove('refreshToken')
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

  return { logout }
}
