const {upload} = require('../helpers/uploadImage');

const cosa = (req,res,next)=>{

    upload()

    next()

}