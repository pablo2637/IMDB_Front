const express = require('express');
const router = express.Router();

const { requiresAuth } = require('express-openid-connect');
const { registerUser } = require('../helpers/registerUser')


const {
    // validateUser,
    // registerUser,
    redirectUser } = require('../middlewares/redirectUser');

const {
    adminDashboard,
    userDashboard } = require('../controllers/controllerFront')

router.get('/', (req, res) => { res.render('index') });

router.get('/dashboard',
    requiresAuth(),
    registerUser,
    redirectUser
)

router.get('/user',
    requiresAuth(),
    registerUser,
    userDashboard
)

router.get('/admin',
    requiresAuth(),
    registerUser,
    adminDashboard
)

module.exports = router;