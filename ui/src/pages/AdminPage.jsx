import { Link } from 'react-router-dom'
import { useUsername, useIsLoggedIn } from '../stores/auth/auth.store'
import { useLogout } from '@hooks/useLogout'

const AdminPage = () => {
  const username = useUsername()
  const { logout } = useLogout()
  const loggedIn = useIsLoggedIn()

  return (
    <div>
      Welcome back {username}!
      <div>Status: {loggedIn ? 'logged in' : 'not logged in'}</div>
      <br />
      <button onClick={logout}
        className='flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      >
        Logout
      </button>
    </div>
  )
}

export default AdminPage
