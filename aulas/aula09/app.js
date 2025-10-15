require ("dotenv").config();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");

const tarefaRouter = require('./routes/tarefaRouter');

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PSWD}@${process.env.MONGODB_HOST}/`;

mongoose.connect(url)
.then(() => console.log("Conectado no MongoDB")) 
.catch((err) => {console.log("Erro ao conectar no MongoDB", err.message);
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/tarefas", tarefaRouter);

module.exports = app;