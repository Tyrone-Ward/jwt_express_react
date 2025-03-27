import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { useIsLoggedIn, useSetUserName, useSetIsLoggedIn } from '../stores/auth/auth.store'
import { authApi } from '../api'

const RootLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const setUserName = useSetUserName()
  const loginState = useIsLoggedIn()
  const setLoggedInState = useSetIsLoggedIn()

  const token = localStorage.getItem('token')
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    setContentVisible(false)
    const controller = new AbortController()

    console.log('Route changed:', location.pathname);
    const checkJWT = async () => {
      try {
        const response = await authApi.post('/verifyToken', {token, signal: controller.signal})
        setContentVisible(true)
        setLoggedInState(true)
        console.log('logged in status', loginState)
        // console.log(response)
        const decoded = jwtDecode(token)
        setUserName(decoded.username)
      } catch (err) {
        console.log(err)
        if (err.status === 401) {
          navigate('/auth/login', { state: { prevLocation: "/admin" } })
      }
    }
  }
    checkJWT()
    return () => {
      controller.abort()
    }
  }, [location, loginState])

  return (
      contentVisible ? <Outlet/> : <div></div>
  )
}

export default RootLayout
