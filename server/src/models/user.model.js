import { Sequelize, DataTypes } from 'sequelize'
import logger from '../utils/logger.js'

const sequelize = new Sequelize({
  logging: (msg) => logger.info(msg),
  dialect: 'sqlite',
  storage: './database/database.db'
})

export const User = sequelize.define('User', {
  email: { type: DataTypes.TEXT, allowNull: false, unique: true },
  username: DataTypes.TEXT,
  hashedPass: DataTypes.TEXT,
  role: {
    type: DataTypes.TEXT,
    defaultValue: 'user'
  }
})
