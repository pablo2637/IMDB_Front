const urlBase = process.env.URL_BASE;
const urlBaseBack = process.env.URL_BASE_BACK;
const urlAPI = 'api';
const urlApiKeyIMDB = process.env.API_IMDB;
const urlMoviesMongo = 'movies/mongo';
const urlMoviesIMDB = 'movies/imdb';
const urlBaseIMDB = 'https://imdb-api.com/API';
const urlAPIFavorites = 'api/favorites'
const urlDashboardUser = 'dashboard-usuario';

const fetchData = async (tipo, data) => {
    const body = data.body;
    const bodyJSON = JSON.stringify(data.body);
    const params = data.params || '';
    const query = data.query || '';
    let url = '';
    let options = {};
    
    console.log(params, query, body);

    switch (tipo) {

        //API interna mongo **************************************************
        case 'getMoviesInt':
            url = `${urlBaseBack}/${urlAPI}/${urlMoviesMongo}`;
            break;
        case 'getMovieInt':
            url = `${urlBaseBack}/${urlAPI}/${urlMoviesMongo}/${params.id}`;
            break;
        case 'postMovieInt':
            url = `${urlBaseBack}/${urlAPI}/${urlMoviesMongo}`;
            options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: bodyJSON
            }
            break;
        case 'putMovieInt':
            url = `${urlBaseBack}/${urlAPI}/${urlMoviesMongo}/${params.id}`;
            options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: bodyJSON
            }
            break;
        case 'deleteMovieInt':
            url = `${urlBaseBack}/${urlAPI}/${urlMoviesMongo}/${params.id}`;
            options = { method: 'DELETE' }
            break;
        

        //API externa: IMDb **************************************************
        case 'getMoviesExt':
            url = `${urlBaseIMDB}/AdvancedSearch/${urlApiKeyIMDB}?title=${query.title}`; // busca por query "title"
            break;
        case 'getMovieExt':
            url = `${urlBaseIMDB}/Title/${urlApiKeyIMDB}/${params.movie_id}`; // busca por params "movie_id"
            break;


        //API externa: IMDb (ruta back) **************************************************
        case 'getMovieExtBack':
            url = `${urlBaseBack}/${urlAPI}/${urlMoviesIMDB}/${data}`;
            break;

            
        //API PostgreSQL: usuarios.favoritas **************************************************
        case 'getFavorites':
            url = `${urlBaseBack}/${urlAPIFavorites}/${params.user_id}`;
            break;
        case 'addFavorite': //! revisar
            url = `${urlBaseBack}/${urlAPIFavorites}/${params}?movie_id=${query}`;
            options = {
                method: 'POST',
                body: bodyJSON,
                headers: { 'Content-Type': 'application/json' }
            };
            break;
        case 'deleteFavorite':
            url = `${urlBaseBack}/${urlAPIFavorites}/${params}?movie_id=${query}`;
            options = { method: 'DELETE' };
            break;
    };

    //Fetch
    try {
        const request = await fetch(url, options);
        const response = await request.json();
        if (!response) return {
            ok: false,
            msg: 'Error fetchData',
            response
        };

        return {
            ok: true,
            data: response
        };
    } catch (e) {
        console.log('error', e)
        return {
            ok: false,
            error: e
        };
    };
};

module.exports = { fetchData }