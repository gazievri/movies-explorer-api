const routerMovies = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  addMovie,
  getAllUserMovies,
  deleteMovieById,
} = require('../controllers/movies');

routerMovies.get('/movies', auth, getAllUserMovies);

routerMovies.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1).max(100)
      .messages({
        'string.required': 'Field has to be filled',
        'string.min': 'Field must contain at least of 1 characters',
        'string.max': 'Field must be no more than 100 characters',
      }),
    director: Joi.string().required().min(1).max(100)
      .messages({
        'string.required': 'Field has to be filled',
        'string.min': 'Field must contain at least of 1 characters',
        'string.max': 'Field must be no more than 100 characters',
      }),
    duration: Joi.number().required().min(1).max(100) // проверить формат и исправить валидацию
      .messages({
        'number.required': 'Field has to be filled',
        'number.min': 'Field must contain at least of 1 characters',
        'number.max': 'Field must be no more than 100 characters',
      }),
    year: Joi.number().required().min(2)
      .messages({
        'number.required': 'Field has to be filled',
        'number.min': 'Field must contain at least of 2 characters',
      }),
    description: Joi.string().required().min(1).max(100)
      .messages({
        'string.required': 'Field has to be filled',
        'string.min': 'Field must contain at least of 1 characters',
        'string.max': 'Field must be no more than 100 characters',
      }),
    image: Joi.string().required().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/)
      .messages({
        'string.required': 'Field has to be filled',
        'string.pattern': 'Field must be a link',
      }),
    trailerLink: Joi.string().required().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/)
      .messages({
        'string.required': 'Field has to be filled',
        'string.pattern': 'Field must be a link',
      }),
    nameRU: Joi.string().required().min(1).max(100)
      .messages({
        'string.required': 'Field has to be filled',
        'string.min': 'Field must contain at least of 1 characters',
        'string.max': 'Field must be no more than 100 characters',
      }),
    nameEN: Joi.string().required().min(1).max(100)
      .messages({
        'string.required': 'Field has to be filled',
        'string.min': 'Field must contain at least of 1 characters',
        'string.max': 'Field must be no more than 100 characters',
      }),
    thumbnail: Joi.string().required().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/)
      .messages({
        'string.required': 'Field has to be filled',
        'string.pattern': 'Field must be a link',
      }),
    movieId: Joi.number().required().min(1) // проверить формат и исправить валидацию
      .messages({
        'number.required': 'Field has to be filled',
        'number.min': 'Field must contain at least of 1 characters',
      }),
  }),
}), auth, addMovie);

routerMovies.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required().min(1).max(100)
      .messages({
        'number.required': 'Field has to be filled',
        'number.min': 'Field must contain at least of 1 characters',
        'number.max': 'Field must be no more than 100 characters',
      }),
  }),
}), auth, deleteMovieById);

module.exports = routerMovies;
