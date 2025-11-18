const { crifarSenha, gerarToken, compararSenha } = require('../middlewares/authMiddleware');
const Usuario = require('../models/usuariosModel');

async function criar(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(422).json({ msg: 'Email e Senha são obrigatórios' });
    }

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(409).json({ msg: 'Email já cadastrado' });
    }

    const senhaCifrada = crifarSenha(senha);

    const novoUsuario = await Usuario.create({
      email,
      senha: senhaCifrada
    });

    return res.status(201).json({ _id: novoUsuario._id, email: novoUsuario.email });
  } catch (err) {
    return res.status(422).json({ msg: 'Email e Senha são obrigatórios' });
  }
}

async function entrar(req, res) {
  try {
    const { usuario, senha } = req.body;
    if (!usuario || !senha) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }

    const usuarioEncontrado = await Usuario.findOne({ email: usuario });
    if (!usuarioEncontrado) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }

    const senhaConfere = compararSenha(senha, usuarioEncontrado.senha);
    if (!senhaConfere) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }

    const token = gerarToken({ email: usuario });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(401).json({ msg: 'Credenciais inválidas' });
  }
}

async function renovar(req, res) {
  try {
    // req.usuario foi normalizado no middleware como string (email) quando possível
    const email = typeof req.usuario === 'string' ? req.usuario : (req.usuario && req.usuario.email) || null;
    if (!email) {
      return res.status(401).json({ msg: 'Token inválido' });
    }
    const token = gerarToken({ email });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
}

async function remover(req, res) {
  try {
    const { usuario } = req.body;
    if (!usuario) {
      return res.status(422).json({ msg: 'Usuario obrigatório' });
    }

    await Usuario.findOneAndDelete({ email: usuario });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ msg: 'Erro ao remover usuário' });
  }
}

async function removerPorId(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(422).json({ msg: 'Id obrigatório' });
    }

    const doc = await Usuario.findByIdAndDelete(id);
    if (!doc) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ msg: 'Erro ao remover usuário' });
  }
}

module.exports = {
  criar,
  entrar,
  renovar,
  remover,
  removerPorId
};