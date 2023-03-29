const express = require('express');
const router = express.Router();

const { requiresAuth } = require('express-openid-connect');

const {
    getMovies,
    mostrarFormularioNueva,
    crearMovieNueva,
    mostrarFormularioEditar,
    editarMovie,
    eliminarMovie
} = require('../controllers/controllerFrontAdmin');

const { onlyAdmin } = require('../middlewares/onlyAdmin')

//* MOSTRAR TODAS LAS PELÍCULAS
router.get('/',
    requiresAuth(),
    onlyAdmin,
    getMovies);


//* MOSTRAR EL FORMULARIO DE CREAR PELÍCULA
router.get('/nueva',
    requiresAuth(),
    onlyAdmin,
    mostrarFormularioNueva);


//* CREAR NUEVA PELÍCULA
router.post('/crear-pelicula',
    requiresAuth(),
    onlyAdmin,
    crearMovieNueva); // ruta del action del form


//* MOSTRAR EL FORMULARIO DE EDITAR PELÍCULA
router.get('/editar/:id',
    requiresAuth(),
    onlyAdmin,
    mostrarFormularioEditar);

//* EDITAR UNA PELÍCULA
router.post('/editar/:id',
    requiresAuth(),
    onlyAdmin,
    editarMovie);


//* ELIMINAR UNA PELÍCULA
router.post('/eliminar/:id',
    requiresAuth(),
    onlyAdmin,
    eliminarMovie);


module.exports = router;