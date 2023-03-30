const { fetchData } = require('../helpers/fetchData');
const fs = require('fs').promises;

const urlBase = 'http://localhost:3005/images';
const urlStatic = './public/images';


const getMovies = async (req, res) => {

  const tipo = 'getMoviesInt';

  try {

    const { data } = await fetchData(tipo, req);

    if(data.ok){

      return res.status(200).render('../views/admin/dashboard-admin.ejs', {
        ok: true,
        movies: data.movies
      });    

    } else {

      return res.status(400).json({
        ok: false,
        msg: 'ERROR: no se han podido cargar las películas.'
      });

    };
    
  } catch (error) {

    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'ERROR: contacte con el administrador.',
      error
    });

  };

}; //!FUNC-GETMOVIES


const mostrarFormularioNueva = async (req, res) => {

  try {

    return res.status(200).render("../views/admin/vistaCrearPelicula");
    
  } catch (error) {

    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'ERROR: contacte con el administrador.',
      error
    });

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
    console.log(data, "el primero")
    if (data.ok) {
      console.log(data, "el segundo ")
      
      return res.status(201).redirect('/dashboard-admin');

    } else {

      return res.status(400).json({
        ok: false,
        msg: 'ERROR: no se ha podido crear la película.'
      });

    };

  } catch (error) {

    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'ERROR: contacte con el administrador.',
      error
    });

  };

}; //!FUNC-CREARMOVIENUEVA


const mostrarFormularioEditar = async (req, res) => {

  const tipo = 'putMovieInt';

  try {
    
    const { data } = await fetchData(tipo, req);

    if(data.ok){

      return res.status(200).render('../views/admin/vistaEditarPelicula.ejs', {
        movies: data.response
      });  

    } else {

      return res.status(400).json({
        ok: false,
        msg: 'ERROR: no se ha podido cargar el formulario para editar la película.'
      });

    };

  } catch (error) {

    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'ERROR: contacte con el administrador.',
      error
    });

  };

}; //!FUNC-MOSTRARFORMULARIOEDITAR


const editarMovie = async (req, res) => {

  // variables
  const tipo = 'putMovieInt';

  let oldPic = req.body.image.split('/'); // separar la ruta tomando como división el '/' que las une
  oldPic = oldPic[oldPic.length-1]; // el nombre del archivo 

  const form = { opinion: req.body.opinion, fecha: req.body.fecha, url: req.body.url, escritor: req.body.escritor };
  req.body.opinions = form;

  // fetch
  try {

    if(req.file != undefined){
      await fs.unlink(`${urlStatic}/${oldPic}`);
      req.body.image = `${urlBase}/${req.file.filename}`;
    } else {
      req.body.image;
    };

    const { data } = await fetchData(tipo, req);

    if(data.ok){

      return res.status(200).redirect('/dashboard-admin');

    } else {

      return res.status(400).json({
        ok: false,
        msg: 'ERROR: no se ha podido editar la película.'
      });

    };

  } catch (error) {

    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'ERROR: contacte con el administrador.',
      error
    });

  };

}; //!FUNC-EDITARMOVIE


const eliminarMovie = async (req, res) => {

  // variables
  const tipo = 'deleteMovieInt';

  // fetch
  try {

    const {ok, data} = await fetchData(tipo, req);

    const {response} = data;
    
    if (!ok) {

      return res.status(400).json({
        ok: false,
        msg: 'ERROR: no se ha podido eliminar la película.',
      });

    } else {

      const {image, _id} = response;

      let deletePic = image.split('/');
      deletePic = deletePic[deletePic.length-1];   

      await fs.unlink(`${urlStatic}/${deletePic}`); // eliminar foto de la carpeta images

      await fetchData('deleteAllFavorites', _id); // eliminar película de favoritas de usuarios (SQL)

      return res.status(200).redirect('/dashboard-admin');

    };
    
  } catch (error) {

    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'ERROR: contacte con el administrador.',
      error
    });

  };

}; //!FUNC-ELIMINARMOVIE



module.exports = {
  getMovies,
  mostrarFormularioNueva,
  crearMovieNueva,
  mostrarFormularioEditar,
  editarMovie,
  eliminarMovie
};