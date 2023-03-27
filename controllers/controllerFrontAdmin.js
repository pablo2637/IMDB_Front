const { fetchData } = require('../helpers/fetchData');



const getMovies = async (req, res) => {

    const tipo = 'getMoviesInt';

    const { data } = await fetchData(tipo, req);

    console.log('controller:', data);

    res.render('../views/admin/dashboard-admin.ejs', {
        movies: data.movies
    })

}; //!FUNC-GETMOVIES


const mostrarFormularioNueva = async (req, res) => {
    res.render("../views/admin/vistaCrearPelicula")


}; //!FUNC-MOSTRARFORMULARIONUEVA


const crearMovieNueva = async (req, res) => {



}; //!FUNC-CREARMOVIENUEVA


const mostrarFormularioEditar = async (req, res) => {



}; //!FUNC-MOSTRARFORMULARIOEDITAR


const editarMovie = async (req, res) => {



}; //!FUNC-EDITARMOVIE


const eliminarMovie = async (req, res) => {



}; //!FUNC-ELIMINARMOVIE



module.exports = {
    getMovies,
    mostrarFormularioNueva,
    crearMovieNueva,
    mostrarFormularioEditar,
    editarMovie,
    eliminarMovie
};