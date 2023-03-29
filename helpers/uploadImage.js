const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images'); // ruta donde queremos guardar las imágenes
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`); // de esta forma prevenimos que se reemplacen los archivos que tengan el mismo nombre
    }
  });

  
const upload = multer({ storage: storage }); // almacena la configuración de la función 'storage'


exports.upload = upload.single('photo'); // el atributo name del input 'file' se tiene que llamar igual (image)