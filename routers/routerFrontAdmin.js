const express = require('express');
const router = express.Router();

const {
    getMovies,
    mostrarFormularioNueva,
    crearMovieNueva,
    mostrarFormularioEditar,
    editarMovie,
    eliminarMovie
} = require('../controllers/controllerFrontAdmin');



//* MOSTRAR TODAS LAS PELÍCULAS
router.get('/', getMovies);


//* MOSTRAR EL FORMULARIO DE CREAR PELÍCULA
router.get('/nueva', mostrarFormularioNueva);


//* CREAR NUEVA PELÍCULA
router.post('/crear-pelicula', crearMovieNueva); // ruta del action del form


//* MOSTRAR EL FORMULARIO DE EDITAR PELÍCULA
router.get('/editar/:id', mostrarFormularioEditar);

//* EDITAR UNA PELÍCULA
router.post('/editar/:id', editarMovie);


//* ELIMINAR UNA PELÍCULA
router.post('/eliminar/:id', eliminarMovie);


module.exports = router;