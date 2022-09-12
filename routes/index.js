const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-errors');

router.use(routerUsers);
router.use(routerMovies);

router.all('/*', auth, () => {
  throw new NotFoundError('Requested path not found');
});

module.exports = router;
