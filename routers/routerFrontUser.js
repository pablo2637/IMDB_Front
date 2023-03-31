const express = require('express');
const router = express.Router();

const { requiresAuth } = require('express-openid-connect');

const { notAdmin } = require('../middlewares/onlyAdmin')

const {
    searchMoviesC,
    getMovieC,
    fetchOpinions,
    search,
    getFavorites,
    deleteFavorite } = require('../controllers/controllerFrontUser');


//Vista buscar películas
router.get('/userSearch/search',
    requiresAuth(),
    notAdmin,
    search)


//Vista resultado de búsqueda de películas
router.post('/userSearch/searchMovies',
    requiresAuth(),
    notAdmin,
    searchMoviesC)


//Vista mostrar detalle de película
router.get('/userSearch/showMovie/:id',
    requiresAuth(),
    notAdmin, getMovieC)


//Buscar opiniones (mejorar)
router.get('/userSearch/getOpinions/:id',
    requiresAuth(),
    notAdmin,
    fetchOpinions)


//* MOSTRAR LAS PELÍCULAS FAVORITAS DEL USUARIO
router.get('/favoritas/:user_id',
    requiresAuth(),
    notAdmin,
    getFavorites);


//* ELIMINAR PELÍCULA DE LISTA DE FAVORITAS DEL USUARIO
router.get('/eliminar-favorita/:user_id',
    requiresAuth(),
    notAdmin,
    deleteFavorite); // ruta "no visible"

module.exports = router;