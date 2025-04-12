import { create } from 'zustand'

export const AuthStore = create((set) => ({
  userName: 'unknown',
  userRole: 'unknown',
  userId: 'unknown',
  isLoggedIn: false,
  userLogout: () => {
    set({ isLoggedIn: false })
    localStorage.removeItem('token')
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
