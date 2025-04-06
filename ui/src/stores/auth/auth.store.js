import { create } from 'zustand'

export const useAuthStore = create((set) => ({
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
export const useSetUserName = () => useAuthStore((state) => state.setUserName)
export const useSetUserRole = () => useAuthStore((state) => state.setUserRole)
export const useSetUserId = () => useAuthStore((state) => state.setUserId)
export const useSetIsLoggedIn = () => useAuthStore((state) => state.setIsLoggedIn)
export const useUserLogout = () => useAuthStore((state) => state.userLogout)

// Hooks
export const useUsername = () => useAuthStore((state) => state.userName)
export const useUserRole = () => useAuthStore((state) => state.userRole)
export const useUserId = () => useAuthStore((state) => state.userId)
export const useIsLoggedIn = () => useAuthStore((state) => state.isLoggedIn)
