const { isAdmin } = require('../helpers/registerUser')

const userDashboard = (req, res) => {
    const user = req.oidc.user;
    res.render('dashboard-user', { user })
}

const adminDashboard = async (req, res) => {
    const user = req.oidc.user;
    if (await isAdmin(req,res) == 'admin') res.render('dashboard-admin', { user, urlTitle:'Dashboard admin' })
    else res.render('dashboard-user', { user, urlTitle:'Dashboard usuario' })
}

module.exports = {
    userDashboard,
    adminDashboard
}