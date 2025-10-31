const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const token = req.headers['authorization'];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({ msg: 'Token invalido' });
    }
  }

  return res.status(401).json({ msg: 'Não autorizado' });
}

function gerarToken(payload) {
  const expiresIn = 120;
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (error) {
    throw new Error('Erro ao gerar o token');
  }
}

module.exports = {
  verificarToken,
  gerarToken
};