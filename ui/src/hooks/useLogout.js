import { useSetUserName, useSetUserId, useSetUserRole, useSetIsLoggedIn } from '../stores/auth/auth.store.js'
import { authApi } from '../api'

export const useLogout = () => {
  const setUsername = useSetUserName()
  const setUserId = useSetUserId()
  const setUserRole = useSetUserRole()
  const isLoggedIn = useSetIsLoggedIn()

  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    console.log('refreshToken', refreshToken)
    try {
      // TODO: Use DELETE method
      const response = await authApi.post(
        '/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        }
      )

      if (response.status === 200) {
        // Handle successful login, e.g., set username, role, etc
        setUsername(null)
        setUserId(null)
        setUserRole(null)
        isLoggedIn(false)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { logout }
}
