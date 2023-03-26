const queriesAuth = {
    getUser: `SELECT u.name, u.email, r.rol
                FROM users AS u
                    INNER JOIN
                    rols AS r ON u.user_id = r.user_id
                WHERE u.email = $1;`,
    insertUser: `INSERT INTO users(name, email, auth0_id)
                    VALUES ($1, $2, $3);`,
    insertRol: `INSERT INTO rols(rol, user_id)
                    VALUES ($1,(SELECT user_id FROM users WHERE email = $2));`,
    insertLog: `INSERT INTO logs(date, event, user_id)
                    VALUES ($1,$2,(SELECT user_id FROM users WHERE email = $3));`,
    isAdmin: `SELECT rol
                FROM rols as r
                INNER JOIN users as u
                ON r.user_id=u.user_id
                WHERE u.email=$1;`
}

module.exports = { queriesAuth };