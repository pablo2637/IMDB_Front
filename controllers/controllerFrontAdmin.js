const { body } = require('express-validator');
const {fetchData} = require('../helpers/fetchData');



const getMovies = async (req, res) => {

    const tipo = 'getMoviesInt';

    const {data} = await fetchData(tipo, req);
    const {movies} = data;


    res.render('../views/admin/dashboard-admin.ejs', {
        movies: data.movies
    })

}; //!FUNC-GETMOVIES


const mostrarFormularioNueva = async (req, res) => {
    res.render("../views/admin/vistaCrearPelicula")


}; //!FUNC-MOSTRARFORMULARIONUEVA


const crearMovieNueva = async (req, res) => {
 //const id = req.params.id;
 const tipo = 'postMovieInt';
 
try {
  
  const form  = {opinion: req.body.opinion, fecha: req.body.fecha, url: req.body.url, escritor: req.body.escritor}
  req.body.opinions=form

  const data = await fetchData(tipo,req);

  console.log(data.opinions, "este es el de opinions")
  if (data.ok) {
    res.status(201).send({ msg: 'Esta todo bien'})

    res.redirect('/dashboard-admin');
  } else {
    res.status(400).send({ error: 'Error al crear la película.' });
  }
} catch (error) {
  console.log(error);
  res.status(500).send({ error: 'Error al crear la película.' });
}
}; //!FUNC-CREARMOVIENUEVA



const mostrarFormularioEditar = async (req, res) => {

    const id = req.params.id;
    const tipo = 'putMovieInt';

    try {
        const {data} = await fetchData(tipo, req, id);
        //console.log(data)
        //esta es la ruta del formulario que no esta creado todavia
        res.render('../views/admin/vistaEditarPelicula.ejs', {
            movies: data.response

        });
    } catch (error) {
        console.log(error);
    }
  

}; //!FUNC-MOSTRARFORMULARIOEDITAR


const editarMovie = async (req, res) => {


    const tipo = 'putMovieInt';

    const form  = {opinion: req.body.opinion, fecha: req.body.fecha, url: req.body.url, escritor: req.body.escritor}
    req.body.opinions=form

   
    try {
        const {data} = await fetchData(tipo, req);
              
        console.log(data)

        res.redirect('/dashboard-admin');

    } catch (error) {
        console.log(error);
    }
//funcion 

}; //!FUNC-EDITARMOVIE


const eliminarMovie = async (req, res) => {

    const tipo = 'deleteMovieInt';
    console.log("Holaaa")

    //const {data} = await fetchData(tipo, req);

    const movies=await fetchData(tipo, req);
    
     //const {movies} = data;

    try {

    console.log(movies)
      if (!movies) {
        return res.status(404).json({
          ok: false,
          msg: 'Película no encontrada',
        });
      }

      res.redirect('/dashboard-admin');
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al eliminar la película',
      });
    }

//funcion eliminar 

}; //!FUNC-ELIMINARMOVIE



module.exports = {
    getMovies,
    mostrarFormularioNueva,
    crearMovieNueva,
    mostrarFormularioEditar,
    editarMovie,
    eliminarMovie
};