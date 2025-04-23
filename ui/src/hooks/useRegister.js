import { useNavigate } from 'react-router-dom'
import { authApi } from '../api'
import { toast } from 'react-toastify'

export const useRegister = () => {
  const navigate = useNavigate()

  const register = async (username, email, password) => {
    try {
      const response = await authApi.post('/register', {
        username,
        email,
        password
      })

      if (response.status === 200) {
        // Handle successful registration, e.g., redirect to login
        toast.success('Registration successfull')
        navigate('/auth/login')
      }
    } catch (error) {
      console.log(error)
      toast.error('Wrong username and/or password.')
    }
  }

  return { register }
}
