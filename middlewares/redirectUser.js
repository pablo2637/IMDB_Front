const { isAdmin } = require('../helpers/registerUser')

const redirectUser = async (req, res) => {
    const rol = await isAdmin(req,res);
    if (rol == 'admin') return res.render('dashboard-admin', { user: req.oidc.user, urlTitle:'Dashboard admin' });
    return res.render('dashboard-user', { user: req.oidc.user, urlTitle:'Dashboard usuario' });
}


module.exports = { redirectUser }