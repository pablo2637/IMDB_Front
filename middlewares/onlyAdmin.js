const { isAdmin } = require('../helpers/registerUser')

const onlyAdmin = async (req, res, next) => {
    const rol = await isAdmin(req, res)
    console.log('onlyAdmin',rol)
    if (rol=='admin') next();
    else res.redirect('/dashboard/')
}

module.exports = { onlyAdmin }