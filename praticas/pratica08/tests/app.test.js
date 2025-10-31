const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let token = '';
let novoToken = '';

describe('Testes da API REST', () => {
  test('GET /produtos sem token deve retornar 401 e msg "Não autorizado"', async () => {
    const res = await request.get('/produtos');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('msg', 'Não autorizado');
  });

  test('GET /produtos com token inválido deve retornar 401 e msg "Token inválido"', async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', '123456789');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('msg', 'Token invalido');
  });

  test('POST /usuarios/login com credenciais válidas deve retornar 200 e um token', async () => {
    const res = await request
      .post('/usuarios/login')
      .send({ usuario: 'email@exemplo.com', senha: 'abcd1234' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('GET /produtos com token válido deve retornar 200 e JSON', async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', token);
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  test('POST /usuarios/renovar com token válido deve retornar 200 e novo token', async () => {
    const res = await request
      .post('/usuarios/renovar')
      .set('authorization', token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    novoToken = res.body.token;
  });

  test('GET /produtos com novo token deve retornar 200 e JSON', async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', novoToken);
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });
});