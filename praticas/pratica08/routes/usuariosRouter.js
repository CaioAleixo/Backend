const express = require('express');
const { verificarToken, gerarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', (req, res) => {
  const token = gerarToken({ email: req.body.usuario });
  return res.status(200).json({ token });
});

router.post('/renovar', verificarToken, (req, res) => {
  const novoToken = gerarToken({ email: req.usuario.email });
  return res.status(200).json({ token: novoToken });
});

module.exports = router;