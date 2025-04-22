import React from 'react'
import { Link } from "react-router-dom"
import { useIsLoggedIn, useUsername } from '../stores/auth/auth.store'

const HomePage = () => {
  const username = useUsername()
  const loggedIn = useIsLoggedIn()

  return (
    <div>
      <h1>Hello, {loggedIn ? username + '👋!' : 'stranger'}</h1>
        <div>
            <ul className="m-8 list-disc">
                <li>
                  <Link to={"/auth/login"}> Login </Link>
                </li>
                <li>
                  <Link to={"admin"}>Admin</Link>
                </li>
                <li>
                  <Link to={"public"}>Public</Link>
                </li>
                <li>
                  <Link to={"users"}>Users</Link>
                </li>
                <li>
                  <Link to={"profile"}>Profile</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default HomePage