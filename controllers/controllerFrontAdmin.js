const { fetchData } = require('../helpers/fetchData');

const urlBase = 'http://localhost:3005/images';


const getMovies = async (req, res) => {

  const tipo = 'getMoviesInt';

  const { data } = await fetchData(tipo, req);

  res.render('../views/admin/dashboard-admin.ejs', {
    movies: data.movies
  });

}; //!FUNC-GETMOVIES


const mostrarFormularioNueva = async (req, res) => {

  res.render("../views/admin/vistaCrearPelicula");

}; //!FUNC-MOSTRARFORMULARIONUEVA


const crearMovieNueva = async (req, res) => {

  // variables
  const tipo = 'postMovieInt';

  req.file != undefined ? req.body.image = `${urlBase}/${req.file.filename}` : console.log('Error: no se ha subido ninguna foto.'); // validación –temporal– para inputs file (foto) / hidden (url)

  const form = { opinion: req.body.opinion, fecha: req.body.fecha, url: req.body.url, escritor: req.body.escritor };
  req.body.opinions = form;

  // fetch
  try {

    const data = await fetchData(tipo, req);
    
    if (data.ok) {
      
      res.status(201).redirect('/dashboard-admin');

    } else {

      res.status(400).send({ error: 'Error: no se ha podido crear la película al crear la película.' });

    };

  } catch (error) {

    console.log(error);
    res.status(500).send({ error: 'Error: contacte con el administrador.' });

  };

}; //!FUNC-CREARMOVIENUEVA


const mostrarFormularioEditar = async (req, res) => {

  const id = req.params.id;
  const tipo = 'putMovieInt';

  try {
    const { data } = await fetchData(tipo, req);

    console.log('CONTROLLER:', data)

    res.render('../views/admin/vistaEditarPelicula.ejs', {
      movies: data.response

    });
  } catch (error) {
    console.log(error);
  }


}; //!FUNC-MOSTRARFORMULARIOEDITAR


const editarMovie = async (req, res) => {

  const tipo = 'putMovieInt';

  req.file != undefined ? req.body.image = `${urlBase}/${req.file.filename}` : req.body.image; // TEMPORAL: validación de image //! en el else tendría que subir la ruta anterior

  const form = { opinion: req.body.opinion, fecha: req.body.fecha, url: req.body.url, escritor: req.body.escritor }
  req.body.opinions = form

  try {
    const { data } = await fetchData(tipo, req);

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

  const movies = await fetchData(tipo, req);

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