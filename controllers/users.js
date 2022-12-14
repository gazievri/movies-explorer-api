const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-errors');
const EmailExistError = require('../errors/email-exist-errors');
const NotFoundError = require('../errors/not-found-errors');
const { JWT_PRODUCTION_KEY } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  STATUS_CREATED,
} = require('../utils/constants');

module.exports.getUserInfo = (req, res, next) => {
  const { _id } = req.user;

  User.find({ _id })
    .then((user) => res.send({ data: user[0] }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        name, email, password: hash,
      },
    ))
    .then((user) => {
      const userWithOutPassword = user.toObject();
      delete userWithOutPassword.password;
      res.status(STATUS_CREATED).send(userWithOutPassword);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
        return;
      }
      if (err.code === 11000) {
        next(new EmailExistError(`User with email ${email} already exist`));
        return;
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`User ID ${userId} is not found`);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid data passed when updating profile'));
        return;
      }
      if (err.code === 11000) {
        next(new EmailExistError(`User with email ${email} already exist`));
        return;
      }
      if (err.name === 'CastError') {
        next(new BadRequestError('User ID is incorrect'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_PRODUCTION_KEY, { expiresIn: '7d' });
      res.cookie('authorization', token, {
        maxAge: 3600000 * 24 * 7, httpOnly: true, secure: true, sameSite: 'none',
      }).send({ message: 'Athorization successful' });
    })
    .catch(next);
};

module.exports.signout = (req, res) => {
  const userId = req.user._id;
  res.clearCookie('authorization').send({ message: `Signout user ${userId} is successful` });
};
