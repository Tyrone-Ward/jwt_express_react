import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  userName: 'unknown',
  userRole: 'unknown',
  isLoggedIn: false,
  userLogout: () => {
    set({ isLoggedIn: false })
    localStorage.removeItem('token')
  },
  setUserName: (uName) => set({ userName: uName }),
  setuserRole: (uRole) => set({ userRole: uRole }),
  setIsLoggedIn: (loggedInStatus) => set({ isLoggedIn: loggedInStatus })
}))

// Actions
export const useSetUserName = () => useAuthStore((state) => state.setUserName)
export const useSetIsLoggedIn = () => useAuthStore((state) => state.setIsLoggedIn)
export const useSetUserRole = () => useAuthStore((state) => state.setuserRole)
export const useUserLogout = () => useAuthStore((state) => state.userLogout)

// Hooks
export const useIsLoggedIn = () => useAuthStore((state) => state.isLoggedIn)
export const useUsername = () => useAuthStore((state) => state.userName)
export const useUserRole = () => useAuthStore((state) => state.userRole)
