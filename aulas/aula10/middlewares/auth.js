const jwt = require("jsonwebtoken");

function verificarToken (req, res, next) {
    const {authorization} = req.headers;

    try {
        const payload = jwt.verify(authorization, process.env.JWT_SEGREDO);
        req.payload = payload;
        return next();
    }
    catch (err) {
        res.status(401).json({msg: "Token invalido"});
    }
};

function gerarToken (payload) {
    try {
        const token = jwt.sign(payload, process.env.JWT_SEGREDO);
        return token;
    } 
    catch (err) {
        throw Error ("Erro ao gerar token");
    }
};

module.exports = { verificarToken, gerarToken };