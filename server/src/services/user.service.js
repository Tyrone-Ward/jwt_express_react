import { User } from '../models/user.model.js'
import logger from '../utils/logger.js'

export const createUser = async (email, userName, hashedPass) => {
  try {
    await User.sync()
    logger.info('The table for the User model was just (re)created!')
    const newUser = await User.create({ email, username: userName, hashedPass })
    console.log("new User's auto-generated ID:", newUser.id)
  } catch (error) {
    logger.error(error)
  }
}
