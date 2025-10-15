function listar (req, res) {
    return res.json({});
}


function criar (req, res) {
    return res.status(201).json({});
}


function buscar (req, res, next) {
    const {id} = req.params;
    next();
}


function exibir (req, res) {
    return res.json({});
}


function atualizar (req, res) {
    return res.json({});
}


function remover (req, res) {
    return res.status(204).end();
}


module.exports = {listar, criar, buscar, exibir, atualizar, remover};