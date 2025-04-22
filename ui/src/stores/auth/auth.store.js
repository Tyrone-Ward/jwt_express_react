import { create } from 'zustand'
import { toast } from 'react-toastify'
import { authApi } from '../../api'

export const AuthStore = create((set) => ({
  userName: undefined,
  userRole: 'user',
  userId: '',
  isLoggedIn: false,
  userLogout: async () => {
    set({ isLoggedIn: false })
    localStorage.removeItem('token')
    try {
      await authApi.post('/logout', {})
    } catch (error) {
      console.error('Error in data fetch:', error)
    }
  },
  login: async (email, password) => {
    try {
      const response = await authApi.post('/login', {
        email,
        password
      })

      if (response.status === 200) {
        // Handle successful login, e.g., set username, role, etc
        const resToken = response.data.accessToken
        localStorage.setItem('token', resToken)
      }
    } catch (error) {
      if (error.status === 400) {
        console.log(error)
        toast.error('Wrong username and/or password.')
      }
    }
  },
  setUserName: (uName) => set({ userName: uName }),
  setUserRole: (uRole) => set({ userRole: uRole }),
  setUserId: (uId) => set({ userId: uId }),
  setIsLoggedIn: (loggedInStatus) => set({ isLoggedIn: loggedInStatus })
}))

// Actions
export const useSetUserName = () => AuthStore((state) => state.setUserName)
export const useSetUserRole = () => AuthStore((state) => state.setUserRole)
export const useSetUserId = () => AuthStore((state) => state.setUserId)
export const useSetIsLoggedIn = () => AuthStore((state) => state.setIsLoggedIn)
export const useUserLogout = () => AuthStore((state) => state.userLogout)
export const useUserLogin = () => AuthStore((state) => state.login)

// Hooks
export const useUsername = () => AuthStore((state) => state.userName)
export const useUserRole = () => AuthStore((state) => state.userRole)
export const useUserId = () => AuthStore((state) => state.userId)
export const useIsLoggedIn = () => AuthStore((state) => state.isLoggedIn)

// TODO: useLogin and useRegister hooks
