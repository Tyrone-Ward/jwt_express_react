import React from 'react'
import { useIsLoggedIn } from '../stores/auth/auth.store'

const PublicPage = () => {
  const loggedIn = useIsLoggedIn()
  console.log(loggedIn)
  return (
    <>
      <div>PublicPage</div>
      <div>Status: {loggedIn ? 'logged in' : 'not logged in'}</div>
    </>
  )
}

export default PublicPage
