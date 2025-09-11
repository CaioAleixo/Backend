// importa o framework 
const express = require("express");

// importa middleware de terceiros
const cors = require('cors');

// importa middleware de rota
const router = require('./routerTarefa');

// criar uma instância da aplicação
const app = express();

// middleware embutido ou integrado
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// middleware de terceiro
app.use(cors());

// middleware de aplicação
app.use( function (req, res, next) {
    console.log("Passei aqui!");
    next();
});

app.use('/tarefas', router);

// middleware de erro
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Algo de errado não está certo!")
});

// inicia a aplicação 
app.listen(3000, () => {
    console.log("App está ON!");
})