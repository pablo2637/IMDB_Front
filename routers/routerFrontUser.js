const express = require('express');
const router = express.Router();

const {
    searchMoviesC,
    getMovieC,
    fetchOpinions } = require('../controllers/controllerFrontUser')

//Vista buscar películas
router.get('/search', (req, res) => {
    res.render('search-movies', {
        ok: false,
        movies: [],
        opinions: []
    })
})

//Vista resultado de búsqueda de películas
router.post('/searchMovies', searchMoviesC)

//Vista mostrar detalle de película
router.get('/showMovie/:id', getMovieC)

//Buscar opiniones (mejorar)
router.get('/getOpinions/:id', fetchOpinions)

module.exports = router;