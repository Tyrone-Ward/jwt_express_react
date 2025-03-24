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
import AdminPage from './pages/AdminPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFound from './pages/NotFound.jsx'
import PublicPage from './pages/PublicPage.jsx'
import RegisterPage from './pages/authentication/RegisterPage.jsx'

function App () {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>

        <Route path='/' element={<RootLayout />}>
          <Route path='admin' element={<AdminPage />} />  
          <Route index element={<HomePage />} />
          <Route path='public' element={<PublicPage/>} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer />
    </>
  )
}

export default App
