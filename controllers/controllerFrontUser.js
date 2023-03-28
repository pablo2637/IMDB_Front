const {fetchData} = require('../helpers/fetchData');



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
    deleteFavorite
};