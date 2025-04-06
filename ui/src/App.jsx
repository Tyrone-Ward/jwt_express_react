import {
  BrowserRouter,
  Route,
  Routes,
  RouterProvider
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import './App.css'

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
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>

        <Route path='/' element={<AuthLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path='/' element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path='admin' element={<AdminPage />} />  
          <Route path='public' element={<PublicPage/>} />
          <Route path='users' element={<UsersPage/>} />
          <Route path='profile' element={<ProfilePage/>} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer />
    </>
  )
}

export default App
