const express = require('express');
const actorRouter = require('./actor.router');
const genreRouter = require('./genre.router');
const movieRouter = require('./movie.router');
const directorRouter = require('./director.router');
const router = express.Router();

// colocar las rutas aquí
router.use(actorRouter)
router.use(genreRouter)
router.use(movieRouter)
router.use(directorRouter)

module.exports = router;