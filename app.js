const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerMovies = require('./routes/movies');
const NotFoundError = require('./errors/not-found-errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { corsOptions } = require('./utils/corsOptions');
const { handleError } = require('./utils/handleError');
const { limiter } = require('./utils/limiter');
const { MONGODB_SERVER } = require('./utils/config');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors()); // включить опции после создания фронта и подключения его к серверу

app.use(limiter);

app.use(helmet());

app.use(cookieParser());

app.use(bodyParser.json());

mongoose.connect(MONGODB_SERVER, {
  useNewUrlParser: true,
});

app.use(requestLogger); // подключаем логгер запросов

app.use(routerUsers);

app.use(routerMovies);

app.all('/*', () => {
  throw new NotFoundError('Requested path not found');
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
