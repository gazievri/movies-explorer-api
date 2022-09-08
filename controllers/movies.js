const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-errors');
const NotFoundError = require('../errors/not-found-errors');
const ForbiddenError = require('../errors/forbidden-errors');

const {
  STATUS_CREATED,
  STATUS_OK,
} = require('../utils/constants');

module.exports.getAllUserMovies = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .then((movies) => {
      if (!movies) { throw new NotFoundError('Movies not found'); }
      res.status(STATUS_OK).send({ data: movies });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('User ID is incorrect'));
        return;
      }
      next(err);
    });
};

module.exports.addMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.status(STATUS_CREATED).send({ data: movie }))
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  const user = req.user._id;

  Movie.find({ movieId, owner: user })
    .then((movie) => {
      if (movie.length === 0) { throw new NotFoundError('Movie not found'); }
      return movie.remove();
    })
    .then(() => {
      res.status(STATUS_OK).send({ message: `Movie ${movieId} has been removed` });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Movie ID is incorrect'));
        return;
      }
      next(err);
    });
};
