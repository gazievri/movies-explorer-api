const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  createUser,
  login,
  getUserInfo,
  updateUser,
} = require('../controllers/users');

routerUsers.get('/users/me', auth, getUserInfo);

routerUsers.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.required': 'Name has to be filled',
        'string.min': 'Name must contain at least of 2 characters',
        'string.max': 'Name must be no more than 30 characters',
      }),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: false } })
      .messages({
        'string.required': 'Email has to be filled',
        'string.email': 'Email must be real email',
      }),
  }),
}), auth, updateUser);

routerUsers.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: false } })
      .messages({
        'string.required': 'Email has to be filled',
        'string.email': 'Email must be real email',
      }),
    password: Joi.string().required().min(6).pattern(/^[a-zA-Z0-9]{3,30}$/)
      .messages({
        'string.required': 'Password has to be filled',
        'string.min': 'Password must be at least 6 characters',
        'string.pattern': 'Password must contain numbers or letters',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.required': 'Name has to be filled',
        'string.min': 'The name must contain at least of 2 characters',
        'string.max': 'Name must be no more than 30 characters',
      }),
  }),
}), createUser);

routerUsers.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: false } })
      .messages({
        'string.required': 'Email has to be filled',
        'string.email': 'Email must be real email',
      }),
    password: Joi.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/)
      .messages({
        'string.required': 'Password has to be filled',
        'string.min': 'Password must be at least 6 characters',
        'string.pattern': 'Password must contain numbers or letters',
      }),
  }),
}), login);

routerUsers.get('/signout', (req, res) => {
  res.clearCookie('authorization').send({ message: 'Signout is successful' });
}, auth);

module.exports = routerUsers;
