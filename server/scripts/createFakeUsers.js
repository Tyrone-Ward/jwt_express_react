import { createUser } from '../src/services/user.service.js'
import bcrypt from 'bcryptjs'

const createUsers = async () => {
  try {
    // Fetch user data from the API
    const response = await fetch('https://dummyjson.com/users')
    const data = await response.json()
    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(10)
    // Iterate through each user in the fetched data
    for (const user of data.users) {
      const hashedPassword = await bcrypt.hash(user.password, salt)
      await createUser(user.email, user.username, hashedPassword)
    }
  } catch (error) {
    console.error('Error fetching or creating users:', error)
  }
}

createUsers()
