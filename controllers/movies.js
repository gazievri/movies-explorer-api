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

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) { throw new NotFoundError('Movie not found'); }
      // eslint-disable-next-line eqeqeq
      if (movie.owner != req.user._id) { throw new ForbiddenError('You can not delete not yours movies'); }
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
