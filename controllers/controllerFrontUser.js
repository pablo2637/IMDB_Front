const { fetchData } = require("../helpers/fetchData")

const searchMoviesC = async (req, res) => {
    // console.log('body', req.body, 'params', req.params, 'query', req.query)    
    let movies, opinions, response;
    let api = 'mongo'
    response = await fetchData('getMovieTitleInt', req);
    movies = response.data.response;
    movies.map(mv => {
        mv.api = api;
        mv.year = `(${mv.year.toString()})`;
        mv.id_movie = mv._id;
    });
    opinions = ''//movies.data.opinions;

    response = await fetchData('getMoviesExt', req);
    api = 'imdb';
    response.data.map(mv => {
        mv.api = api;
        let stars = mv.directors;
        if (mv.directors) mv.directors = mv.directors.split(', ')[0];
        else mv.directors = '--';
        if (stars) mv.stars = stars.split(', ').slice(1).join(', ');
        else mv.stars = '--';
    })
    movies = movies.concat(response.data);

    if (movies) {
        // const favorites = await fetchData('getFavorites', );
        // console.log(favorites)
        // if (favorites) {

        // }

        res.render('search-movies', {
            ok: true,
            movies,
            opinions
        })
    }
}

const getMovieC = async (req, res) => {
    // console.log('body', req.body, 'params', req.params, 'query', req.query)
    let opinions = '', movie;
    let tipo = 'getMovieInt'

    if (req.params.id.includes('tt')) tipo = 'getMovieExt';
    const response = await fetchData(tipo, req);

    if (tipo == 'getMovieInt') opinions = {
        ok: true,
        RT: response.data.response.opinions,
        SC: ''
    }
    console.log(response)
    if (response) {
        if (tipo == 'getMovieInt') movie = response.data.response;
        else movie = response.data;

        res.render('show-movie', {
            ok: true,
            movie,
            opinions
        })
    }
}

const fetchOpinions = async (req, res) => {
    const movie = await fetchData('getMovieExt', req);
    const opinions = await fetchData('getOpinions', { body: movie.data });

    const opSC = opinions.data.SC.data;
    const opRT = opinions.data.RT.data;
    if (opSC || opRT) res.render('show-movie', {
        ok: true,
        movie: movie.data,
        opinions: { RT: opRT, SC: opSC }
    });
    else res.render('show-movie', {
        ok: true,
        movie: movie.data,
        opinions: 'No'
    });
}

module.exports = {
    searchMoviesC,
    getMovieC,
    fetchOpinions
}