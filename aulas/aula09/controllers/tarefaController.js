const mongoose = require('mongoose');
const Tarefa = require('../models/tarefaModel');

async function listar (req, res) {
    try {
    const tarefas = await Tarefa.find({});
    return res.json(tarefas);
    } catch(err) {
        res.status(500).json({ msg: "Deu ruim:" + err.message });
    }
}

async function criar (req, res) {

    try {
        const novaTarefa = await Tarefa.create({
            nome: req.body.nome,
            concluida: false,
        })
        return res.status(201).json(novaTarefa);
    }
    catch (err) {
        if (err.errors) {
            return res.status(422).json({msg: err.errors['nome'].message});
        }
    }
    return req.status(500).json({msg: "Deu ruim"});
}


async function buscar (req, res, next) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({msg: "ID inválido"});
    }

    const tarefaEncontrada = await Tarefa.findOne({ _id: id });
    if (tarefaEncontrada) {
        req.tarefa = tarefaEncontrada;
        return next();
  }
  return res.status(404).json({msg: "Tarefa não encontrada"});
}


function exibir (req, res) {
    return res.json(req.tarefa);
}


async function atualizar (req, res) {

    try {
        const { id } = req.params;
        const tarefaAtualizada = await Tarefa.findOneAndUpdate({_id:id}, {...req.body}, {new: true, runValidators: true});
        return res.json(tarefaAtualizada);
    }
    catch (err) {
        if (err.errors) {
            return res.status(422).json({msg: err.errors['nome'].message});
        }
    }
    return req.status(500).json({msg: "Deu ruim"});
}



async function remover (req, res) {
    const { id } = req.params;
    const tarefaRemovida = await Tarefa.findOneAndDelete({_id:id})
    return res.status(204).end();
}


module.exports = {listar, criar, buscar, exibir, atualizar, remover};