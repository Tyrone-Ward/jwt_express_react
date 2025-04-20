import { Sequelize, DataTypes } from 'sequelize'
import logger from '../utils/logger.js'

const sequelize = new Sequelize({
  logging: (msg) => logger.info(msg),
  dialect: 'sqlite',
  storage: './database/database.db'
})

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  username: {
    type: DataTypes.TEXT,
    unique: true
  },
  hashedPass: {
    type: DataTypes.TEXT
  },
  role: {
    type: DataTypes.TEXT
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
})

export const RefreshToken = sequelize.define('RefreshToken', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  tokenHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  revoked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

RefreshToken.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})
