// models/User.ts

import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

// Define an interface for the User attributes
export interface UserInstance extends Model {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

export default User;
