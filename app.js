const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerMovies = require('./routes/movies');
const NotFoundError = require('./errors/not-found-errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsOptions } = require('./utils/corsOptions');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors()); // включить опции после создания сервера и подключения домена

app.use(cookieParser());

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(requestLogger); // подключаем логгер запросов

app.use(routerUsers);

app.use(routerMovies);

app.all('/*', () => {
  throw new NotFoundError('Requested path not found');
});

app.use(errorLogger); // подключаем логгер ошибок

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
