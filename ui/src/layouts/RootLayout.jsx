import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar.jsx'
import { authApi } from '../api/index.js'
import { useIsLoggedIn, useSetUserName, useSetUserId, useSetUserRole, useSetIsLoggedIn, useEntryPoint } from '../stores/auth/auth.store.js'
import { jwtDecode } from 'jwt-decode'

const RootLayout = () => {
  const [contentVisible, setContentVisible] = useState(false)

  const loggedIn = useIsLoggedIn()
  const setUsername = useSetUserName()
  const setUserId = useSetUserId()
  const setUserRole = useSetUserRole()
  const isLoggedIn = useSetIsLoggedIn()
  const navigate = useNavigate()
  const entryPoint = useEntryPoint()

  useEffect(() => {
    const controller = new AbortController()
    const refreshToken = localStorage.getItem('refreshToken')

    const initAuth = async () => {
      try {
        const response = await authApi.post('/refresh', {}, {
          headers: {
            Authorization: `Bearer ${refreshToken}`
          },
          signal: controller.signal
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
          navigate(entryPoint, { replace: true })
        }
        console.log(response)
      } catch (error) {
        console.log('error:', error.status)
        if (error.status === 404) {
          navigate('/auth/login', { replace: true })
        }
      } finally {
        setContentVisible(true)
      }
    }

    if (!loggedIn) {
      initAuth()
    } else {
      setContentVisible(true)
    }
  }, [])

  return (
    contentVisible
      ? <main>
          <Navbar />
          <Outlet />
        </main>
      : <div />
  )
}

export default RootLayout
