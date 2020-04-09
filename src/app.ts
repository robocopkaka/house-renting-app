import express from 'express';
import session from 'express-session';
import chalk from 'chalk';
import { createLogger, format, transports } from 'winston';
import dotenv from 'dotenv';

import indexRouter from './routes/index';
import landlord from './routes/usersRouter';
import { createServer } from "http";
import sequelize from "./index";

dotenv.config();

const app = express();
const logger = createLogger({
  level: 'debug',
  format: format.simple(),
  transports: [new transports.Console()]
});

app.use(require('morgan')('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

// routes
app.use('/', indexRouter);
app.use('/landlord', landlord);

app.get('/', (req: any, res: any) => {
  res.status(200).send('app works');
});

app.get('/*', (req: any, res: any) => {
  res.status(200).send('Nothing found');
});

const port = process.env.PORT || 8000;

(async () => {
  await sequelize.sync({ logging: false });

  createServer(app)
    .listen(
      port,
      () => logger.debug(`Server running on port ${chalk.blue(port)}`)
    );
})();

export = app;
