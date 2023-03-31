const { isAdmin } = require('../helpers/registerUser')

const onlyAdmin = async (req, res, next) => {
    const rol = await isAdmin(req, res)
    // console.log('onlyAdmin', rol)
    if (rol == 'admin') next();
    else res.redirect('/dashboard/')
}

const notAdmin = async (req, res, next) => {
    const rol = await isAdmin(req, res)
    // console.log('notAdmin', rol)
    if (rol != 'admin') next();
    else res.redirect('/dashboard-admin/')
}

module.exports = {
    onlyAdmin,
    notAdmin
}