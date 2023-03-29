const { fetchData } = require("../helpers/fetchData")

const {
    getIdCookie,
    getFavsCookie,
    setFavsCookie } = require('../helpers/cookies')

const searchMoviesC = async (req, res) => {   
    let movies, opinions, response;
    let api = 'mongo'

    response = await fetchData('getMovieTitleInt', req);
    movies = response.data.response;
    movies.map(mv => {
        mv.api = api;
        mv.year = `(${mv.year.toString()})`;
        mv.id_movie = mv._id;
    });
    opinions = '';

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
        req.cookieID = getIdCookie(req, res);
        const favorites = await fetchData('getFavorites', req);

        if (favorites) {
            const favUser = favorites.data.data;
            setFavsCookie(req, res, JSON.stringify(favUser));
            movies.map(m => m.fav = favUser.find(f => f.movie_id == m.id_movie));
        }

        res.render('search-movies', {
            ok: true,
            movies,
            opinions
        })
    }
}

const getMovieC = async (req, res) => {
    let opinions = '', movie;
    let tipo = 'getMovieInt'

    if (req.params.id.includes('tt')) tipo = 'getMovieExt';
    const response = await fetchData(tipo, req);

    if (tipo == 'getMovieInt') opinions = {
        ok: true,
        RT: response.data.response.opinions,
        SC: ''
    }

    if (response) {
        if (tipo == 'getMovieInt') movie = response.data.response;
        else movie = response.data;

        const favUser = getFavsCookie(req, res);
        movie.fav = favUser.find(f => f.movie_id == movie.id_movie);

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
    
    const favUser = getFavsCookie(req, res);
    movie.data.fav = favUser.find(f => f.movie_id == movie.data.id_movie);
    
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


const getFavorites = async (req, res) => {

    const id = req.params.user_id; // se captura para pasárselo al botón de eliminar

    const arrayMovies = [];

    try {

        const { data } = await fetchData('getFavorites', req);

        const movies = data.data.map(movie => movie = movie.movie_id); // extraigo solo los 'movie_id'
        
        for(let i = 0; i < movies.length; i++){
            let {data} = await fetchData('getMovieExtBack', movies[i]);
            arrayMovies.push(data);
        };
        
    } catch (error) {

        console.log(error);
        
    };


    res.render('../views/favoritas.ejs', {
        arrayMovies,
        user_id: id
    });

}; //!FUNC-GETFAVORITES


const deleteFavorite = async (req, res) => {

    const tipo = 'deleteFavorite';

    const datos = {
        params: req.params.user_id,
        query: req.query.movie_id
    };

    try {

        await fetchData(tipo, datos);
        
    } catch (error) {

        console.log(error);
        
    };

    res.redirect(`/dashboard-usuario/favoritas/${req.params.user_id}`);

}; //!FUNC-DELETEFAVORITE


module.exports = {
    getFavorites,
    deleteFavorite,
     searchMoviesC,
    getMovieC,
    fetchOpinions
};

