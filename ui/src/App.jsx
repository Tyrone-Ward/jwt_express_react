import { useEffect } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import { useIsLoggedIn, useSetEntryPoint } from './stores/auth/auth.store.js'

// Layouts
import RootLayout from './layouts/RootLayout.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'

// Pages
import LoginPage from './pages/authentication/LoginPage.jsx'
import RegisterPage from './pages/authentication/RegisterPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFound from './pages/NotFound.jsx'
import PublicPage from './pages/PublicPage.jsx'
import UsersPage from './pages/UsersPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

function App () {
  const loggedIn = useIsLoggedIn()
  useSetEntryPoint(window.location.pathname)

  useEffect(() => {
    console.log('location changed')
    console.log('loggedIn:', loggedIn)

    return () => {
      // controller.abort()
      null
    }
  }, [loggedIn])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<AuthLayout />}>
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
          </Route>

          <Route path='/' element={<RootLayout />}>
            <Route index element={loggedIn ? <HomePage /> : <Navigate to='/auth/login' />} />
            <Route path='admin' element={loggedIn ? <AdminPage /> : <Navigate to='/auth/login' />} />
            <Route path='users' element={loggedIn ? <UsersPage /> : <Navigate to='/auth/login' />} />
            <Route path='profile' element={loggedIn ? <ProfilePage /> : <Navigate to='/auth/login' />} />
            <Route path='public' element={<PublicPage />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
