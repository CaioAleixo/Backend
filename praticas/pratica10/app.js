require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const apidocsRouter = require('./routes/apidocsRouter');
const usuariosRouter = require('./routes/usuariosRouter');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger route
app.use('/api-docs', apidocsRouter);

// API routes
app.use('/usuarios', usuariosRouter);

// Health route (simples)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Tratamento de erros genérico
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

// Conexão com MongoDB Atlas usando variáveis de ambiente
const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_DATABASE
} = process.env;

const user = encodeURIComponent(MONGODB_USER || '');
const pass = encodeURIComponent(MONGODB_PASSWORD || '');
const host = MONGODB_HOST || '';
const database = MONGODB_DATABASE || 'pratica10';

const connectionString = `mongodb+srv://${user}:${pass}@${host}/${database}?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB conectado');
}).catch(err => {
  console.error('Erro ao conectar no MongoDB:', err.message);
});

module.exports = app;