import { Sequelize, DataTypes } from 'sequelize'
import logger from '../utils/logger.js'

const sequelize = new Sequelize({
  logging: (msg) => logger.info(msg),
  dialect: 'sqlite',
  storage: './database/database.db'
})

export const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  email: { type: DataTypes.TEXT, allowNull: false, unique: true },
  username: { type: DataTypes.TEXT, unique: true },
  hashedPass: DataTypes.TEXT,
  role: DataTypes.TEXT,
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
})
