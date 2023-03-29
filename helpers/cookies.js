
const setIdCookie = (req, res, id) => {
    res.cookie('idIMDB', id,
        {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 600000
        })
}

const setFavsCookie = (req, res, favs) => {
    res.cookie('favsIMDB', favs,
        {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 600000
        })
}

const setRolCookie = (req, res, rol) => {
    res.cookie('rolIMDB', rol,
        {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 600000
        })
}

const getIdCookie = (req, res) => {
    const { idIMDB } = req.cookies
    return idIMDB;
}

const getRolCookie = (req, res) => {
    const { rolIMDB } = req.cookies
    return rolIMDB;
}

const getFavsCookie = (req, res) => {
    const { favsIMDB } = req.cookies
    return JSON.parse(favsIMDB);
}


const clearCookies = (req, res) => {
    res.clearCookie('idIMDB');
    res.clearCookie('rolIMDB');
    res.clearCookie('favsIMDB');
}

module.exports = {
    getRolCookie,
    getIdCookie,
    setIdCookie,
    setRolCookie,
    setFavsCookie,
    getFavsCookie,
    clearCookies
}