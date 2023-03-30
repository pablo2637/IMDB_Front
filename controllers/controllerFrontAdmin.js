const { fetchData } = require('../helpers/fetchData');

const urlBase = 'http://localhost:3005/images';


const getMovies = async (req, res) => {

  const tipo = 'getMoviesInt';

  try {

    const { data } = await fetchData(tipo, req);

    if(data.ok){

      res.status(200).render('../views/admin/dashboard-admin.ejs', {
        movies: data.movies
      });    

    } else {

      res.status(400).send({ error: 'No se han podido cargar las películas.' });

    }
    
  } catch (error) {
    
    console.log(error);
    res.status(500).send({ error: 'Contacte con el administrador.' });

  }



}; //!FUNC-GETMOVIES


const mostrarFormularioNueva = async (req, res) => {

  try {

    res.render("../views/admin/vistaCrearPelicula");
    
  } catch (error) {

    console.log(error);
    res.status(500).send({ error: 'Contacte con el administrador.' });
    
  };

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

  const tipo = 'putMovieInt';

  try {
    
    const { data } = await fetchData(tipo, req);

    if(data.ok){

      res.status(200).render('../views/admin/vistaEditarPelicula.ejs', {
        movies: data.response
      });  

    } else {

      res.status(400).send({ error: 'No se ha podido cargar el formulario para editar la película.' });

    };


  } catch (error) {

    console.log(error);
    res.status(500).send({ error: 'Contacte con el administrador.' });

  };


}; //!FUNC-MOSTRARFORMULARIOEDITAR


const editarMovie = async (req, res) => {

  // variables
  const tipo = 'putMovieInt';

  req.file != undefined ? req.body.image = `${urlBase}/${req.file.filename}` : req.body.image; // validación –temporal– para inputs file (foto) / hidden (url)

  const form = { opinion: req.body.opinion, fecha: req.body.fecha, url: req.body.url, escritor: req.body.escritor };
  req.body.opinions = form;

  // fetch
  try {

    const { data } = await fetchData(tipo, req);

    if(data.ok){

      res.status(200).redirect('/dashboard-admin');

    } else {

      res.status(400).send({ error: 'No se ha podido editar la película.' });

    };

  } catch (error) {

    console.log(error);
    res.status(500).send({ error: 'Contacte con el administrador.' });

  };

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