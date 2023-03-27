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



const addFavorite = async (req, res) => {

    // tengo que hacer dos req: uno para el id del usuario y otro para el id de la película.
    // comprobación: si el id_movie ya existe asociado al id_usuario, mostrar mensaje "la película ya está guardada como favorita"; en caso contrario, guardar (pasar req al fetchData)
    // ¿hacer res.redirect según la página en la que se encuentre (buscador o detalle-pelicula)?

    const tipo = 'addFavorite';

    const datos = {
        user_id: req.params.user_id, //! probar si con 'params' en vez de 'user_id' funciona igual
        body: req.body //! lo mismo para el body
    };

    console.log('CONTROLLER ADDFAVORITE:', body)

    //! hacer un console.log() de const url = location.href (por ejemplo), para ver si así se puede armar la condicional para el redirect (si 'buscador' o 'detalle-pelicula', en caso tal)

    try {

        const solicitud = await fetchData(tipo, datos);

        if(solicitud.ok){
            console.log('Película guardada en favoritas con éxito') //! probar qué trae solicitud y si solicitud.ok se recibe, ya que esto se puede utilizar para pintar algún mensaje al usuario
        }
        
    } catch (error) {

        console.log(error);
        
    };

    //res.redirect('/dashboard-usuario/favoritas');

}; //!FUNC-ADDFAVORITE



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
    addFavorite,
    deleteFavorite
};