const express = require('express');
const router = express.Router();

const {getFavorites, addFavorite, deleteFavorite} = require('../controllers/controllerFrontUser');



//* MOSTRAR LAS PELÍCULAS FAVORITAS DEL USUARIO
router.get('/favoritas/:user_id', getFavorites);


//* GUARDAR PELÍCULA EN LISTA DE FAVORITAS DEL USUARIO
router.get('/guardar-favorita/:user_id', addFavorite); // ruta "no visible"


//* ELIMINAR PELÍCULA DE LISTA DE FAVORITAS DEL USUARIO
router.get('/eliminar-favorita/:user_id', deleteFavorite); // ruta "no visible"



module.exports = router;