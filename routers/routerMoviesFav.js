const express = require('express');
const router = express.Router();

const {getFavorites, addFavorite, deleteFavorite} = require('../controllers/controllerFrontUser');



//* MOSTRAR LAS PELÍCULAS FAVORITAS DEL USUARIO
router.get('/favoritas/:user_id', getFavorites);


//* GUARDAR PELÍCULA EN LISTA DE FAVORITAS DEL USUARIO
// router.post('/guardar-fav/:id_usuario?id_movie=id_movie', addFavorite); // ruta del atributo action del form


//* ELIMINAR PELÍCULA DE LISTA DE FAVORITAS DEL USUARIO
// router.post('/actualizar-fav/:id_usuario?id_movie=id_movie', deleteFavorite); // ruta del atributo action del form



module.exports = router;