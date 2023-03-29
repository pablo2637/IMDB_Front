
const setIdCookie = async (req, res, id) => {
    await res.cookie('idIMDB', id,
        {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 600000
        })
}

const setFavsCookie = async (req, res, favs) => {
    await res.cookie('favsIMDB', favs,
        {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 600000
        })
}

const setRolCookie = async (req, res, rol) => {
    await res.cookie('rolIMDB', rol,
        {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 600000
        })
}

const getIdCookie = async (req, res) => {
    const { idIMDB } = req.cookies
    return idIMDB;
}

const getRolCookie = async (req, res) => {
    const { rolIMDB } = req.cookies
    return rolIMDB;
}

const getFavsCookie = async (req, res) => {
    const { favsIMDB } = req.cookies

    if (favsIMDB) return (favsIMDB);
    else return [];
}

const clearCookies = async (req, res) => {
    await res.clearCookie('idIMDB');
    await res.clearCookie('rolIMDB');
    await res.clearCookie('favsIMDB');
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