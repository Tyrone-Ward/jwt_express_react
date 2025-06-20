import { User } from '../models/user.model.js'
import logger from '../utils/logger.js'
import { AppError } from '../utils/AppError.js'

// TODO: Remove this 'service' as it is unnecessary. Move logic into login controller function
export const createUser = async (email, userName, hashedPass) => {
  try {
    await User.sync()
    const users = await User.findAll()
    // First user to register is admin
    const role = users.length === 0 ? 'admin' : 'user'

    logger.info('The table for the User model was just (re)created!')
    const newUser = await User.create({ email, username: userName, hashedPass, role })
    logger.info("new User's auto-generated ID:", newUser.id)
  } catch (error) {
    // console.log(error.name)
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new AppError('Conflict', 'Username already exists', 409)
    } else {
      throw new AppError('Internal Server Error', error.name, 500)
    }
  }
}
