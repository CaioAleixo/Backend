const express = require("express");

const controller = require('../controllers/tarefaController');

const router = express.Router();

router.get('/', controller.listar);

router.post('/', controller.criar);

router.get('/:id', controller.buscar, controller.exibir);

router.put('/:id', controller.buscar, controller.atualizar);

router.delete('/:id', controller.buscar, controller.remover);

module.exports = router;