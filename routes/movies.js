const routerMovies = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { validateId } = require('../utils/validateId');

const {
  addMovie,
  getAllUserMovies,
  deleteMovieById,
} = require('../controllers/movies');

routerMovies.get('/movies', auth, getAllUserMovies);

routerMovies.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1).max(100),
    director: Joi.string().required().min(1).max(100),
    duration: Joi.number().required().min(1).max(100), // проверить формат и исправить валидацию
    year: Joi.number().required().min(2).max(4),
    description: Joi.string().required().min(1).max(100),
    image: Joi.string().required().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/),
    trailerLink: Joi.string().required().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/),
    nameRU: Joi.string().required().min(1).max(100),
    nameEN: Joi.string().required().min(1).max(100),
    thumbnail: Joi.string().required().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/),
    movieId: Joi.number().required().min(1).max(100), // проверить формат и исправить валидацию
  }),
}), auth, addMovie);

routerMovies.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.number(),
  }),
}), auth, deleteMovieById);

module.exports = routerMovies;
