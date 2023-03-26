const express = require('express');
const router = express.Router();

const { validateUser } = require('../middlewares/validateUser');
const { } = require('../middlewares/')
const {
    adminDashboard,
    userDashboard } = require('../controllers/controllerFront')

router.get('/', (req, res) => { res.render('index') });

router.get('/dashboard',
    validateAdmin,
    // redirectUser
)

router.get('/user',
    validateUser,
    userDashboard
)

router.get('/admin',
    validateAdmin,
    adminDashboard
)

router.get('/custom-logout',
    //loginUser    
)

module.exports = router;