const {fetchData} = require('../helpers/fetchData');



const getMoviesFav = async (req, res) => {

    const tipo = 'getMoviesFav';

    const respuesta = await fetchData(tipo, req);

    // tendría que destructurar la "respuesta" para pasarle esa info al render


    res.send('Probando desde getMoviesFav');

}; //!FUNC-GETMOVIESFAV



const guardarMovieFav = async (req, res) => {

    // tengo que hacer dos req: uno para el id del usuario y otro para el id de la película.
    // comprobación: si el id_movie ya existe asociado al id_usuario, mostrar mensaje "la película ya está guardada como favorita"; en caso contrario, guardar (pasar req al fetchData)
    // ¿hacer res.redirect según la página en la que se encuentre (buscador o detalle-pelicula)?
    

    const tipo = 'guardarMovieFav';

    await fetchData(tipo, req);


    //res.redirect('/dashboard-usuario/favoritas');

}; //!FUNC-GUARDARMOVIEFAV



const actualizarMoviesFav = async (req, res) => {

    // tengo que hacer dos req: uno para el id del usuario y otro para el id de la película.
    // comprobación: si el id_movie NO existe asociado al id_usuario en la bbdd, mostrar mensaje "la película no está guardada como favorita y no se puede eliminar", por ej.; en caso contrario, "eliminar" (actualizar) (pasar req al fetchData)

    const tipo = 'actualizarMoviesFav';

    await fetchData(tipo, req);


    //res.redirect('/dashboard-usuario/favoritas');

}; //!FUNC-ACTUALIZARMOVIESFAV



module.exports = {
    getMoviesFav,
    guardarMovieFav,
    actualizarMoviesFav
};