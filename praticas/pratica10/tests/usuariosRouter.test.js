const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Usuario = require('../models/usuariosModel');

const request = supertest(app);

describe('/usuarios', () => {
  // connect only if not already connected
  beforeAll(async () => {
    const url = process.env.MONGODB_TEST_URI
      || process.env.MONGODB_URI
      || (process.env.MONGODB_HOST && `mongodb+srv://${encodeURIComponent(process.env.MONGODB_USER || '')}:${encodeURIComponent(process.env.MONGODB_PASSWORD || '')}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE || 'pratica10'}?retryWrites=true&w=majority`)
      || 'mongodb://127.0.0.1:27017/pratica10_test';

    if (mongoose.connection.readyState === 0) {
      // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
      await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    }
  });

  // Limpar a coleção antes de cada teste
  beforeEach(async () => {
    await Usuario.deleteMany({});
  });

  it('POST /usuarios => 201 JSON com _id e email', async () => {
    const payload = { email: 'usuario@gmail.com', senha: 'abcd1234' };
    const res = await request.post('/usuarios').send(payload);
    expect(res.status).toBe(201);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('email', payload.email);
  });

  it('POST /usuarios sem JSON => 422 JSON com msg "Email e Senha são obrigatórios"', async () => {
    const res = await request.post('/usuarios').send({});
    expect(res.status).toBe(422);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Email e Senha são obrigatórios');
  });

  it('POST /usuarios/login => 200 JSON com token', async () => {
    // cria usuário para autenticar
    const user = { email: 'usuario_login@gmail.com', senha: 'abcd1234' };
    await request.post('/usuarios').send(user);

    const loginRes = await request.post('/usuarios/login').send({ usuario: user.email, senha: user.senha });
    expect(loginRes.status).toBe(200);
    expect(loginRes.headers['content-type']).toMatch(/json/);
    expect(loginRes.body).toHaveProperty('token');
  });

  it('POST /usuarios/login sem JSON => 401 JSON com msg "Credenciais inválidas"', async () => {
    const res = await request.post('/usuarios/login').send({});
    expect(res.status).toBe(401);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Credenciais inválidas');
  });

  it('POST /usuarios/renovar com token válido => 200 JSON com token', async () => {
    // cria usuário e obtém token
    const user = { email: 'usuario_renovar@gmail.com', senha: 'abcd1234' };
    await request.post('/usuarios').send(user);
    const loginRes = await request.post('/usuarios/login').send({ usuario: user.email, senha: user.senha });
    const token = loginRes.body.token;

    const res = await request.post('/usuarios/renovar').set('authorization', `Bearer ${token}`).send();
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('token');
  });

  it('POST /usuarios/renovar com token inválido => 401 JSON com msg "Token inválido"', async () => {
    const res = await request.post('/usuarios/renovar').set('authorization', 'Bearer 123456789').send();
    expect(res.status).toBe(401);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Token inválido');
  });

  it('DELETE /usuarios/:id com token válido => 204 sem conteúdo', async () => {
    // cria usuário e obtém id e token
    const user = { email: 'usuario_del@gmail.com', senha: 'abcd1234' };
    const createRes = await request.post('/usuarios').send(user);
    const id = createRes.body._id;

    const loginRes = await request.post('/usuarios/login').send({ usuario: user.email, senha: user.senha });
    const token = loginRes.body.token;

    const res = await request.delete(`/usuarios/${id}`).set('authorization', `Bearer ${token}`).send();
    expect(res.status).toBe(204);
    expect(res.body).toEqual({} || null);
  });

  // fechar a conexão mongoose ao final para evitar handles abertos
  afterAll(async () => {
    // apenas drop+close se estivermos conectados
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.dropDatabase().catch(() => {});
      await mongoose.connection.close();
    }
  });
});