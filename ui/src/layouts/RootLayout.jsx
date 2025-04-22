import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Navbar } from '../components/Navbar.jsx'

const RootLayout = () => {
  const [contentVisible, setContentVisible] = useState(true)


  return (
      contentVisible ? 
      <main>
        <Navbar/>
        <Outlet/>
      </main> : 
      <div></div>
  )
}

export default RootLayout
