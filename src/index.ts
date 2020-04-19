// tslint:disable: variable-name

import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const sequelize =  new Sequelize({
  database: config.database,
  dialect: 'postgres',
  username: config.username,
  password: config.password,
  modelPaths: [__dirname + '/models'],
});

export default sequelize;
