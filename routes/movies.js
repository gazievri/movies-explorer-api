const routerMovies = require('express').Router();
const auth = require('../middlewares/auth');
const { movieIdValidation, movieValidation } = require('../middlewares/joiValidation');
const {
  addMovie,
  getAllUserMovies,
  deleteMovieById,
} = require('../controllers/movies');

routerMovies.get('/movies', auth, getAllUserMovies);
routerMovies.post('/movies', movieValidation, auth, addMovie);
routerMovies.delete('/movies/:movieId', movieIdValidation, auth, deleteMovieById);

module.exports = routerMovies;
