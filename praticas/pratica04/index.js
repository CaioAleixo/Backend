// Importando o Express
const express = require("express");

// Array em memória com tarefas
const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

// Criando instância da aplicação
const app = express();

// Middleware para processar JSON
app.use(express.json());

// Middleware de aplicação para log de requisições
app.use((req, res, next) => {
  const dataHora = new Date().toISOString();
  console.log(`[${dataHora}] ${req.method} ${req.url}`);
  next();
});

// Criando roteador específico para tarefas
const router = express.Router();

// GET /tarefas – listar todas
router.get('/', (req, res) => {
  res.json(tarefas);
});

// POST /tarefas – criar nova tarefa
router.post('/', (req, res) => {
  const novaTarefa = {
    id: tarefas.length + 1,
    nome: req.body.nome,
    concluida: req.body.concluida ?? false
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// GET /tarefas/:tarefaId – buscar por ID
router.get('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) {
    return next(new Error("Tarefa não localizada"));
  }
  res.json(tarefa);
});

// PUT /tarefas/:tarefaId – atualizar tarefa
router.put('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) {
    return next(new Error("Tarefa não localizada"));
  }
  tarefa.nome = req.body.nome ?? tarefa.nome;
  tarefa.concluida = req.body.concluida ?? tarefa.concluida;
  res.json(tarefa);
});

// DELETE /tarefas/:tarefaId – remover tarefa
router.delete('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) {
    return next(new Error("Tarefa não localizada"));
  }
  tarefas.splice(index, 1);
  res.status(204).send();
});

// Conectando o roteador à aplicação
app.use('/tarefas', router);

// Middleware de erro
app.use((err, req, res, next) => {
  console.error("Erro:", err.message);
  res.status(400).json({ erro: err.message });
});

// Iniciando o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});