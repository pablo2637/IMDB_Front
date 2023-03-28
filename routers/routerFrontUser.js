const express = require('express');
const router = express.Router();

const {
    searchMoviesC,
    getMovieC,
    fetchOpinions } = require('../controllers/controllerFrontUser')

router.get('/search', (req, res) => {
    res.render('search-movies', {
        ok: false,
        movies: [],
        opinions: []
    })
})

router.post('/searchMovies', searchMoviesC)

router.get('/showMovie/:id', getMovieC)

router.get('/getOpinions/:id', fetchOpinions)

module.exports = router;