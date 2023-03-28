const { isAdmin } = require('../helpers/registerUser')

const userDashboard = (req, res) => {
    const user = req.oidc.user;
    res.render('dashboard-user', { user })
}

const adminDashboard = async (req, res) => {
    const user = req.oidc.user;
    if (await isAdmin(req) == 'admin') res.render('dashboard-admin', { user })
    else res.render('dashboard-user', { user })
}

module.exports = {
    userDashboard,
    adminDashboard
}