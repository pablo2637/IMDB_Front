const { queriesAuth } = require('../models/queries')
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.ELEPHANT_HOST,
    user: process.env.ELEPHANT_USER,
    database: process.env.ELEPHANT_DB,
    password: process.env.ELEPHANT_PASS,
});

const { updateFavsID } = require('../helpers/favorites')

const {
    clearCookies,
    getRolCookie,
    setIdCookie,
    setRolCookie } = require('./cookies')

const isAdmin = async (req, res) => {
    const rolCookie = await getRolCookie(req, res);
    console.log('rolcookie', rolCookie)
    if (rolCookie) return rolCookie;

    let client, data;
    try {
        client = await pool.connect();
        data = await client.query(queriesAuth.isAdmin, [req.oidc.user.email]);
    } catch (e) {
        throw e
    } finally {
        client.release();
    }

    await setRolCookie(req, res, data.rows[0].rol)
    return data.rows[0].rol;
}

const logoutUser = async (req, res) => {
    let client;
    try {
        const fecha = new Date();
        const email = req.oidc.user.email;

        client = await pool.connect();
        await client.query(queriesAuth.insertLog, [fecha.toLocaleString(), 'logout', email]);

    } catch (e) {
        throw e
    } finally {
        client.release();
    }

    await clearCookies(req, res);
    res.redirect('/logout');
}

const registerUser = async (req, res, next) => {
    let client, data, user, correo, id;
    try {
        await clearCookies(req, res);

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
            correo = user.email;
        }
        else {
            user = data.rows[0];
            await client.query(queriesAuth.insertLog, [fecha.toLocaleString(), 'login', req.oidc.user.email]);
            correo = req.oidc.user.email;
        }

        id = await client.query(queriesAuth.getUserID, [correo])
        await setIdCookie(req, res, id.rows[0].user_id);
    } catch (e) {
        throw e
    } finally {
        client.release();
    }
    await updateFavsID(req, res, id.rows[0].user_id);
    req.id = id.rows[0].user_id;
    next();
}

module.exports = {
    registerUser,
    isAdmin,
    logoutUser
}