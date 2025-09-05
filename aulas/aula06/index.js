// importa o framework 
const express = require("express");

// criar uma instância da aplicação
const app = express();

// middleware de aplicação
app.use( function (req, res, next) {
    console.log("Passei aqui!");
    next();
});

// middleware de rota
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Chegou aqui!");
});

router.post('/', (req, res) => {
    res.status(201).send("Inserindo com sucesso!");
});

router.get("/:id", (req, res) => {
    const { id } = req.params;  // {id: 1, param2: 5, param3: 6}
    if(id == 1) res.send("Achei");
    else res.status(404).send("Não achei");
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