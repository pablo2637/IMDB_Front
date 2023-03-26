const { queriesAuth } = require('../models/queries')
const { Pool } = require('pg');

const pool = new Pool({
    host: 'imdb.c0aymyj9upbq.us-east-1.rds.amazonaws.com',
    user: 'postgres',
    database: 'imdb',
    password: 'FullStack23',
    ssl: { rejectUnauthorized: false }
})

const redirectUser = async (req, res) => {
    console.log('oidc', req.oidc.user)
    let client, data, user;
    try {
        client = await pool.connect();
        data = await client.query(queriesAuth.getUser, [req.oidc.user.email]);
        const fecha = new Date();

        if (data.rows == 0) {
            user = {
                name: req.oidc.user.nickname,
                email: req.oidc.user.email,
                auth0_id: req.oidc.user.sub,
                rol: 'user'
            }
            await client.query(queriesAuth.insertUser, [user.name, user.email, user.auth0_id]);
            await client.query(queriesAuth.insertRol, [user.rol, user.email]);
            await client.query(queriesAuth.insertLog, [fecha.toLocaleString(), 'register', user.email]);
        }
        else {
            user = data.rows[0];
            await client.query(queriesAuth.insertLog, [fecha.toLocaleString(), 'login', req.oidc.user.email]);
        }
    } catch (e) {
        throw e
    } finally {
        client.release();
    }

    console.log('redirigir', user)

    if (req.user.rol == 'admin') return 'dashboard-admin';
    else return 'dashboard-user';
}

const validateUser = (req, res, next) => {
    console.log('req.oidc', req.oidc.isAuthenticated())
    if (!req.oidc.isAuthenticated()) res.redirect('../login');

}


module.exports = {
    validateUser,
    redirectUser
}