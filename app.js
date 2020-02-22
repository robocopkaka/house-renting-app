import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
import testRouter  from './routes/test';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use('/', indexRouter);
app.use('/test', testRouter);

app.get('/', (req, res) => {
  res.status(200).send('app works')
});

app.get('/*', (req, res) => {
  res.status(200).send('Nothing found')
});

const port = process.env.PORT || 8000;

module.exports = app;
