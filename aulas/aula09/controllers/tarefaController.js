const Tarefa = require('../models/tarefaModel');

async function listar (req, res) {
    try {
    const tarefas = await Tarefa.find({});
    return res.json(tarefas);
    }
    catch(err) {
        res.status(500).json({msg: "Deu ruim" + err.message});
    }
}


async function criar (req, res) {
    const novaTarefa = await Tarefa.create({
        nome: req.body.nome, 
        concluida: false,
    });
    return res.status(201).json({novaTarefa});
}


async function buscar (req, res, next) {
    const {id} = req.params;
    const tarefaEncontrada = await Tarefa.findOne({_id: id});
    next();
}


function exibir (req, res) {
    return res.json({});
}


async function atualizar (req, res) {
    const { id } = req.params;
    const tarefaAtualizada = await Tarefa.findOneAndUpdate({_id: id}, {...req.body});
    return res.json(tarefaAtualizada);
}


async function remover (req, res) {
    const { id } = req.params;
    const tarefaRemovida = await Tarefa.findOneAndDelete({_id: id});
    return res.status(204).end();
}


module.exports = {listar, criar, buscar, exibir, atualizar, remover};