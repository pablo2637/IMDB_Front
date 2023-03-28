const { isAdmin } = require('../helpers/registerUser')

const redirectUser = async (req, res) => {
    console.log('redirectUser', req.oidc.isAuthenticated())

    const rol = await isAdmin(req);
    if (rol == 'admin') return res.render('dashboard-admin', { user: req.oidc.user });
    return res.render('dashboard-user', { user: req.oidc.user });
}


module.exports = { redirectUser }