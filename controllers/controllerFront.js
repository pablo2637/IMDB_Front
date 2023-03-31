const { isAdmin } = require('../helpers/registerUser')
const { getIdCookie } = require('../helpers/cookies')

const userDashboard = (req, res) => {
    const user = req.oidc.user;
    user.id = getIdCookie(req, res);
    res.render('dashboard-user', { user })
}

const adminDashboard = async (req, res) => {
    const user = req.oidc.user;
    user.id = getIdCookie(req, res);
    if (await isAdmin(req, res) == 'admin') res.render('dashboard-admin', { user, urlTitle: 'Dashboard admin' })
    else res.render('dashboard-user', { user, urlTitle: 'Dashboard usuario' })
}

module.exports = {
    userDashboard,
    adminDashboard
}