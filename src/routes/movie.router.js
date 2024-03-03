const { getAll, create, getOne, remove, update,setGenresMovies,setActorsMovies,setDirectorsMovies } = require('../controllers/movie.controller');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/movies')
    .get(getAll)
    .post(create);

movieRouter.route('/movies/:id')
    .get(getOne)
    .delete(remove)
    .put(update);
movieRouter.route('/movies/:id/genres')
    .post(setGenresMovies);
movieRouter.route('/movies/:id/actors')
    .post(setActorsMovies);
movieRouter.route('/movies/:id/directors')
    .post(setDirectorsMovies);

module.exports = movieRouter;