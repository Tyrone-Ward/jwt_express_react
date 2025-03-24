import React from 'react'
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
        <div>
            <ul className="m-8 list-disc">
                <li>
                  <Link to={"/auth/login"}> Login </Link>
                </li>
                <li>
                  <Link to={"admin"}>Admin</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default HomePage