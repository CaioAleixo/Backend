// Arquivo: app.js

var express = require('express');
var logger = require('morgan');

// a) Importe o middleware de rotas
const tarefaRouter = require('./routes/tarefaRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());

// b) Faça uso do middleware de rota para a rota "/tarefas"
app.use('/tarefas', tarefaRouter);

module.exports = app;