require('dotenv').config();

const usuariosRouter = require('./routes/usuariosRouter');

const produtosRouter = require('./routes/produtosRouter');

const express = require('express');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/usuarios', usuariosRouter);
app.use('/produtos', produtosRouter);


module.exports = app
