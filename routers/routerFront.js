const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (!req.oidc.isAuthenticated()) return res.render("test", {
        msg: 'No logeado',
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
        token: req.oidc.refreshToken
    })

    return res.render("test", {
        msg: 'Logeado correctamente',
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
        token: req.oidc.refreshToken
    })
});

module.exports = router;