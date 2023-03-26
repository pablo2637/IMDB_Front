const {fetchData} = require('../helpers/fetchData');



const getFavorites = async (req, res) => {

    const { data } = await fetchData('getFavorites', req);

    console.log('controller: ', data);

    if(data.ok){

        // const respuesta = await fetchData('getMovieExt', );

        // res.render('../views/favoritas.ejs', {
        //     msg: '¡Sí tenemos películas guardadas en favoritas!'
        // });

    }else{

        res.render('../views/favoritas.ejs', {
            msg: 'No hay películas guardadas en favoritas…'
        });

    };

}; //!FUNC-GETFAVORITES



const addFavorite = async (req, res) => {

    // tengo que hacer dos req: uno para el id del usuario y otro para el id de la película.
    // comprobación: si el id_movie ya existe asociado al id_usuario, mostrar mensaje "la película ya está guardada como favorita"; en caso contrario, guardar (pasar req al fetchData)
    // ¿hacer res.redirect según la página en la que se encuentre (buscador o detalle-pelicula)?
    

    const tipo = 'guardarMovieFav';

    await fetchData(tipo, req);


    //res.redirect('/dashboard-usuario/favoritas');

}; //!FUNC-ADDFAVORITE



const deleteFavorite = async (req, res) => {

    // tengo que hacer dos req: uno para el id del usuario y otro para el id de la película.
    // comprobación: si el id_movie NO existe asociado al id_usuario en la bbdd, mostrar mensaje "la película no está guardada como favorita y no se puede eliminar", por ej.; en caso contrario, "eliminar" (actualizar) (pasar req al fetchData)

    const tipo = 'actualizarMoviesFav';

    await fetchData(tipo, req);


    //res.redirect('/dashboard-usuario/favoritas');

}; //!FUNC-DELETEFAVORITE



module.exports = {
    getFavorites,
    addFavorite,
    deleteFavorite
};