require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { corsOptions } = require('./utils/corsOptions');
const { handleError } = require('./utils/handleError');
const { limiter } = require('./utils/limiter');
const { MONGO_DEV_URL } = require('./utils/config');

const { PORT = 3000, NODE_ENV, MONGO_PROD_URL } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_PROD_URL : MONGO_DEV_URL, {
  useNewUrlParser: true,
});

app.use(cors()); // включить опции после создания фронта и подключения его к серверу
app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(router);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(handleError);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
