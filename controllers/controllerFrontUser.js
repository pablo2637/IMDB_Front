const { fetchData } = require("../helpers/fetchData")

const {
    getIdCookie,
    getFavsCookie,
    setFavsCookie } = require('../helpers/cookies')

const { updateFavs } = require('../helpers/favorites')

const search = async (req, res) => {
    const user = req.oidc.user;
    user.id = await getIdCookie(req, res);

    res.render('search-movies', {
        ok: false,
        movies: [],
        opinions: [],
        urlTitle: 'Buscador de Películas',
        user
    })
}

const searchMoviesC = async (req, res) => {
    let movies, opinions, response;
    let api = 'mongo'
    const search = req.body.title;

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
        const favUser = await getFavsCookie(req, res);
        // console.log('favuser', favUser,typeof favUser)
        if (favUser != 'undefined') movies.map(m => m.fav = favUser.find(f => f.movie_id == m.id_movie));

        console.log('movies', movies)
        const user = req.oidc.user;
        user.id = await getIdCookie(req, res);

        res.render('search-movies', {
            ok: true,
            movies,
            opinions,
            urlTitle: 'Buscador de Películas',
            search,
            user
        })
    }
}

const getMovieC = async (req, res) => {
    let opinions = '', movie;
    let tipo = 'getMovieInt'

    if (req.params.id.includes('tt')) tipo = 'getMovieExt';
    const response = await fetchData(tipo, req);

    if (tipo == 'getMovieInt') opinions = response.data.response.opinions;

    if (response) {
        if (tipo == 'getMovieInt') {
            movie = response.data.response;
            movie.id_movie = movie._id;
        } else movie = response.data;

        const favUser = await getFavsCookie(req, res);
        if (favUser != 'undefined') movie.fav = favUser.find(f => f.movie_id == movie.id_movie);

        const user = req.oidc.user;
        user.id = await getIdCookie(req, res);
        console.log('user', user, 'movie', movie)
        res.render('show-movie', {
            ok: true,
            movie,
            opinions,
            spnSearch: movie.title.replace(' ', '_'),
            user
        })
    }
}

const fetchOpinions = async (req, res) => {
    const movie = await fetchData('getMovieExt', req);
    const opinions = await fetchData('getOpinions', { body: movie.data });

    const opSC = opinions.data.SC.data;
    const opRT = opinions.data.RT.data;

    const favUser = await getFavsCookie(req, res);
    movie.data.fav = favUser.find(f => f.movie_id == movie.data.id_movie);

    const user = req.oidc.user;
    user.id = await getIdCookie(req, res);
    if (opSC || opRT) res.render('show-movie', {
        ok: true,
        movie: movie.data,
        opinions: { RT: opRT, SC: opSC },
        user
    });
    else res.render('show-movie', {
        ok: true,
        movie: movie.data,
        opinions: 'No',
        user
    });
}


const getFavorites = async (req, res) => {

    // const id = req.params.user_id; // se captura para pasárselo al botón de eliminar

    const arrayMovies = [];

    try {

        const { data } = await fetchData('getFavorites', req);
        await setFavsCookie(req, res, data.data);
        // console.log('data', data)

        if (data.ok) {
            const movies = data.data.map(movie => movie = movie.movie_id); // extraigo solo los 'movie_id'

            let tipo;
            for (let i = 0; i < movies.length; i++) {
                if (movies[i].includes('tt')) tipo = 'getMovieExtBack';
                else tipo = 'getMovieIntBack';
                let { data } = await fetchData(tipo, movies[i]);

                // console.log('tipo', tipo)
                // console.log('data', data)                

                if (tipo == 'getMovieIntBack') {
                    if (data.ok) {
                        const idMov = data.response._id;
                        data = data.response;
                        data.id_movie = idMov;
                    } else console.log('Peli no encontrada:', data)
                }


                if (data) arrayMovies.push(data);
            };
        }
    } catch (error) {

        console.log('error:', error);

    };


    const user = req.oidc.user;
    user.id = await getIdCookie(req, res);
    // console.log('user', user)
    // console.log('movies', arrayMovies)
    const favUser = await getFavsCookie(req, res);
    console.log('favuser', favUser)
    if (favUser != 'undefined') arrayMovies.map(m => m.fav = favUser.find(f => f.movie_id == m.id_movie));

    res.render('../views/favoritas.ejs', {
        arrayMovies,
        user
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

    const id = await getIdCookie(req, res);
    res.redirect(`/dashboard-usuario/favoritas/${id}`);


}; //!FUNC-DELETEFAVORITE


module.exports = {
    getFavorites,
    deleteFavorite,
    searchMoviesC,
    search,
    getMovieC,
    fetchOpinions
};

