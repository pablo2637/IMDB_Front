const { isAdmin } = require('../helpers/registerUser')
const { getIdCookie } = require('../helpers/cookies')

const redirectUser = async (req, res) => {
    const rol = await isAdmin(req, res);
    const user = req.oidc.user;
    user.id = getIdCookie(req, res);

    if (rol == 'admin') return res.redirect('/dashboard-admin') //res.render('admin/dashboard-admin', { user, urlTitle: 'Dashboard admin' });
    return res.render('dashboard-user', { user, urlTitle: 'Dashboard usuario' });
}


module.exports = { redirectUser }