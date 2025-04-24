import { create } from 'zustand'
import authDataApi from '../../api'

export const AuthStore = create((set) => ({
  userName: undefined,
  userRole: 'user',
  userId: undefined,
  isLoggedIn: false,
  userLogout: async () => {
    set({ userName: undefined })
    set({ userRole: 'user' })
    set({ userId: undefined })
    set({ isLoggedIn: false })
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    try {
      await authDataApi.post('/logout', { withCredentials: true })
    } catch (error) {
      console.error('Error in data fetch:', error)
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

// Hooks
export const useUsername = () => AuthStore((state) => state.userName)
export const useUserRole = () => AuthStore((state) => state.userRole)
export const useUserId = () => AuthStore((state) => state.userId)
export const useIsLoggedIn = () => AuthStore((state) => state.isLoggedIn)
