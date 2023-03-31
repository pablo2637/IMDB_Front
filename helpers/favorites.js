const { fetchData } = require("../helpers/fetchData")

const {
    getIdCookie,
    setFavsCookie } = require('../helpers/cookies')

const updateFavs = async (req, res) => {
    console.log(await getIdCookie(req, res))
    req.cookieID = await getIdCookie(req, res);

    const { data } = await fetchData('getFavoritesCid', req);
    console.log('updFavs', data)
    if (data.ok) {
        const favUser = data.data;
        await setFavsCookie(req, res, (favUser));
    } else res.clearCookie('favsIMDB');
}

const updateFavsID = async (req, res, id) => {
    req.cookieID = id;
    const { data } = await fetchData('getFavoritesCid', req);
    console.log('updFavs', data)
    if (data.ok) {
        const favUser = data.data;
        await setFavsCookie(req, res, (favUser));
    } else res.clearCookie('favsIMDB');
}

module.exports = {
    updateFavs,
    updateFavsID
}