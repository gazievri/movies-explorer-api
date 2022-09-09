const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');

router.use(routerUsers);
router.use(routerMovies);

module.exports = router;
