const express = require('express');
const usuariosController = require('../controllers/usuariosController');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', usuariosController.criar);
router.post('/login', usuariosController.entrar);
router.post('/renovar', verificarToken, usuariosController.renovar);

// rota para remover por id (correção para o teste que usa /usuarios/:id)
router.delete('/:id', verificarToken, usuariosController.removerPorId);

// rota legacy por body (se quiser manter)
router.delete('/', verificarToken, usuariosController.remover);

module.exports = router;