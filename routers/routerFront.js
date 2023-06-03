const express = require('express');
const router = express.Router();

const { requiresAuth } = require('express-openid-connect');

const {
    registerUser,
    logoutUser } = require('../helpers/registerUser')

const { redirectUser } = require('../middlewares/redirectUser');

const {
    adminDashboard,
    userDashboard } = require('../controllers/controllerFront')

router.get('/', (req, res) => { res.render('index') });

router.get('/customLogout', logoutUser);

router.get('/dashboard',[
    requiresAuth(),
    registerUser],
    redirectUser
)

// router.get('/user',
//     requiresAuth(),
//     registerUser,
//     userDashboard
// )

// router.get('/admin',
//     requiresAuth(),
//     registerUser,
//     adminDashboard
// )

module.exports = router;