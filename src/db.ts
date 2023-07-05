// db.ts

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_USERNAME = 'user',
  DB_PASSWORD = 'password',
  DB_DATABASE = 'database',
} = process.env;

console.log("DB_DATABASE", DB_DATABASE)

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'mysql',
  logging: false, // Disable logging query
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
