const { validationResult } = require("express-validator");

const validarInputs = (req, res, next) => {
    const fallos = validationResult(req);
    if (!fallos.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: fallos.mapped()
        })
    }
    next()
}

module.exports = { validarInputs }