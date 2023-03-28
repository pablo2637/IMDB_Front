const express = require('express');
const router = express.Router();

const {getFavorites, deleteFavorite} = require('../controllers/controllerFrontUser');



//* MOSTRAR LAS PELÍCULAS FAVORITAS DEL USUARIO
router.get('/favoritas/:user_id', getFavorites);


//* ELIMINAR PELÍCULA DE LISTA DE FAVORITAS DEL USUARIO
router.get('/eliminar-favorita/:user_id', deleteFavorite); // ruta "no visible"



module.exports = router;