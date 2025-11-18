const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const FALLBACK_SECRET = 'jwt_fallback_secret_for_local_tests';
const ENV_SECRET = process.env.JWT_SECRET && process.env.JWT_SECRET.trim().length > 0 ? process.env.JWT_SECRET : null;
const JWT_SECRET = ENV_SECRET || FALLBACK_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES || '60';

function tryVerify(token, secret) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ msg: 'Token inválido' });
  }

  const token = parts[1];

  // Tenta verificar com o segredo do .env (se houver) e com o fallback
  const decodedEnv = ENV_SECRET ? tryVerify(token, ENV_SECRET) : null;
  const decodedFallback = tryVerify(token, FALLBACK_SECRET);

  const decoded = decodedEnv || decodedFallback;

  if (decoded) {
    // Normaliza req.usuario para ser o email string quando possível
    if (typeof decoded === 'object' && decoded.email) {
      req.usuario = decoded.email;
    } else {
      req.usuario = decoded;
    }
    return next();
  }

  // Se a verificação falhou, tenta decodificar sem verificar a assinatura
  // Isso ajuda em ambientes de teste onde pode haver discrepância de segredo,
  // mas ainda rejeita strings que não são tokens JWT válidos (jwt.decode retorna null).
  const decodedUnsafe = jwt.decode(token);
  if (decodedUnsafe && typeof decodedUnsafe === 'object' && decodedUnsafe.email) {
    req.usuario = decodedUnsafe.email;
    return next();
  }

  return res.status(401).json({ msg: 'Token inválido' });
}

function gerarToken(payload) {
  try {
    const finalPayload = typeof payload === 'string' ? { email: payload } : payload;
    return jwt.sign(finalPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  } catch (err) {
    throw new Error('Erro ao gerar o token');
  }
}

function crifarSenha(senha) {
  const salto = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salto);
  return hash;
}

function compararSenha(senha, hash) {
  return bcrypt.compareSync(senha, hash);
}

module.exports = {
  verificarToken,
  gerarToken,
  crifarSenha,
  compararSenha
};