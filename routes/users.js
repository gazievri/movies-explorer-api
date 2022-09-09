const routerUsers = require('express').Router();
const auth = require('../middlewares/auth');
const { userCreateValidation, userLoginValidation, userUpdateValidation } = require('../middlewares/joiValidation');
const {
  createUser,
  login,
  getUserInfo,
  updateUser,
  signout,
} = require('../controllers/users');

routerUsers.get('/users/me', auth, getUserInfo);
routerUsers.patch('/users/me', userUpdateValidation, auth, updateUser);
routerUsers.post('/signup', userCreateValidation, createUser);
routerUsers.post('/signin', userLoginValidation, login);
routerUsers.get('/signout', auth, signout);

module.exports = routerUsers;
