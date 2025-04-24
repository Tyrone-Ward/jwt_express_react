import { useIsLoggedIn } from '../stores/auth/auth.store'
import { useState, useEffect } from 'react'
import authDataApi from '../api'

const PublicPage = () => {
    const [ data, setData ] = useState('')
  
    useEffect(() => {
      const controller = new AbortController()
      const getProtectedData = async () => {
        try {
          const response = await authDataApi.get('/protected', { signal: controller.signal })
          console.log(response.data)
          setData(response.data)      
        } catch (error) {
          console.log(error)  
        }
      }
      
      getProtectedData()
    
      return () => {
        controller.abort()
      }
    }, [])

  const loggedIn = useIsLoggedIn()

  return (
    <>
      <div>PublicPage</div>
      <div>Status: {loggedIn ? 'logged in' : 'not logged in'}</div>
      <div>
        {data && 
        <div>
          Protected data: {data}
        </div>
        }
      </div>
    </>
  )
}

export default PublicPage
