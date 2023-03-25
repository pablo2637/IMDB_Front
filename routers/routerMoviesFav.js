const express = require('express');
const router = express.Router();

const {getMoviesFav, guardarMovieFav, actualizarMoviesFav} = require('../controllers/controllerMoviesFav');


//* PELÍCULAS FAVORITAS DEL USUARIO (por eso el id)
router.get('/favoritas/:id_usuario', getMoviesFav);


//* GUARDAR PELÍCULA EN FAVORITAS DEL USUARIO
router.post('/guardar-fav/:id_usuario?id_movie=id_movie', guardarMovieFav); // ruta del atributo action del form


//* ACTUALIZAR ARRAY DE PELÍCULAS FAVORITAS DEL USUARIO
router.post('/actualizar-fav/:id_usuario?id_movie=id_movie', actualizarMoviesFav); // ruta del atributo action del form



module.exports = router;