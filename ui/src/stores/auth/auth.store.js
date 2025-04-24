import { create } from 'zustand'

export const AuthStore = create((set) => ({
  userName: undefined,
  userRole: 'user',
  userId: undefined,
  isLoggedIn: false,
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

// Hooks
export const useUsername = () => AuthStore((state) => state.userName)
export const useUserRole = () => AuthStore((state) => state.userRole)
export const useUserId = () => AuthStore((state) => state.userId)
export const useIsLoggedIn = () => AuthStore((state) => state.isLoggedIn)
