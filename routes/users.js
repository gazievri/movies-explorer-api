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
    name: Joi.string().min(2).max(30),
    password: Joi.string().min(6).max(30),
  }),
}), auth, updateUser);

routerUsers.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: false } }),
    password: Joi.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

routerUsers.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: false } }),
    password: Joi.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/),
  }),
}), login);

routerUsers.get('/signout', (req, res) => {
  res.clearCookie('authorization').send({ message: 'Signout is successful' });
}, auth);

module.exports = routerUsers;
