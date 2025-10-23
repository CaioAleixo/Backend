const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');

async function criar(req, res) {
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    return res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
  }

  try {
    const novoProduto = await Produto.create({ nome, preco });
    return res.status(201).json(novoProduto);
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao criar produto' });
  }
}

async function listar(req, res) {
  const produtosCadastrados = await Produto.find({});
  return res.status(200).json(produtosCadastrados);
}

async function buscar(req, res, next) {
  const { id } = req.params;

  const isValidFormat = /^[a-fA-F0-9]{24}$/.test(id);

  if (!isValidFormat) {
    return res.status(400).json({ msg: 'Parâmetro inválido' });
  }

  try {
    const produtoEncontrado = await Produto.findById(id);

    if (!produtoEncontrado) {
      return res.status(404).json({ msg: 'Produto não encontrado' });
    }

    req.produto = produtoEncontrado;
    return next();
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao buscar produto' });
  }
}

function exibir(req, res) {
  return res.status(200).json(req.produto);
}

async function atualizar(req, res) {
  const { id } = req.params;
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    return res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
  }

  try {
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      id,
      { nome, preco },
      { new: true, runValidators: true }
    );
    return res.status(200).json(produtoAtualizado);
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao atualizar produto' });
  }
}

async function remover(req, res) {
  const { id } = req.params;
  await Produto.findByIdAndDelete(id);
  return res.status(204).end();
}

module.exports = {
  criar,
  listar,
  buscar,
  exibir,
  atualizar,
  remover
};
