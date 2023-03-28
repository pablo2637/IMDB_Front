const { queriesAuth } = require('../models/queries')
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.ELEPHANT_HOST,
    user: process.env.ELEPHANT_USER,
    database: process.env.ELEPHANT_DB,
    password: process.env.ELEPHANT_PASS,
});

const isAdmin = async ({ oidc }, res) => {
    let client, data;
    try {
        client = await pool.connect();
        data = await client.query(queriesAuth.isAdmin, [oidc.user.email]);
    } catch (e) {
        throw e
    } finally {
        client.release();
    }

    console.log('isAdmin', data.rows[0].rol)
    return data.rows[0].rol;
}

const registerUser = async (req, res, next) => {
    console.log('registeruser', req.oidc.user)

    let client, data, user;
    try {
        console.log('cominza')
        client = await pool.connect();
        data = await client.query(queriesAuth.getUser, [req.oidc.user.email]);
        const fecha = new Date();

        if (data.rows == 0) {
            console.log('usuario nuevo')
            user = {
                name: req.oidc.user.nickname,
                email: req.oidc.user.email,
                auth0_id: req.oidc.user.sub,
                rol: 'user'
            }
            console.log('user', user)
            await client.query(queriesAuth.insertUser, [user.name, user.email, user.auth0_id]);
            await client.query(queriesAuth.insertRol, [user.rol, user.email]);
            await client.query(queriesAuth.insertLog, [fecha.toLocaleString(), 'register', user.email]);
        }
        else {
            console.log('usuario registrado')
            user = data.rows[0];
            await client.query(queriesAuth.insertLog, [fecha.toLocaleString(), 'login', req.oidc.user.email]);
        }
        console.log('paso')
    } catch (e) {
        throw e
    } finally {
        client.release();    }

    console.log('register', user)
    next();
}

module.exports = {
    registerUser,
    isAdmin
}