const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Testes para o recurso /produtos', () => {
  let produtoId;

  test('POST /produtos com sucesso', async () => {
    const resposta = await request.post('/produtos').send({
      nome: 'nome',
      preco: 10
    });

    expect(resposta.status).toBe(201);
    expect(resposta.body).toMatchObject({
      nome: 'nome',
      preco: 10
    });
    expect(resposta.body._id).toBeDefined();

    produtoId = resposta.body._id;
  });

  test('POST /produtos sem dados retorna 422 com msg de erro', async () => {
    const res = await request.post('/produtos').send({});
    expect(res.status).toBe(422);
    expect(res.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  test('GET /produtos retorna 200 e um array de objetos', async () => {
    const res = await request.get('/produtos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /produtos/:id válido retorna 200 com os dados do produto', async () => {
    const res = await request.get(`/produtos/${produtoId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', produtoId);
    expect(res.body).toHaveProperty('nome', 'nome');
    expect(res.body).toHaveProperty('preco', 10);
  });

  test('GET /produtos/0 retorna 400 com msg de parâmetro inválido', async () => {
    const res = await request.get('/produtos/0');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

 test('GET /produtos/00000000000000000000000 retorna 400 com msg de parâmetro inválido', async () => {
  const res = await request.get('/produtos/00000000000000000000000');
  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
});

  test('PUT /produtos/:id com dados válidos retorna 200 com dados atualizados', async () => {
    const res = await request.put(`/produtos/${produtoId}`).send({
      nome: 'nome atualizado',
      preco: 20
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', produtoId);
    expect(res.body).toHaveProperty('nome', 'nome atualizado');
    expect(res.body).toHaveProperty('preco', 20);
  });

  test('PUT /produtos/:id sem dados retorna 422 com msg de erro', async () => {
    const res = await request.put(`/produtos/${produtoId}`).send({});
    expect(res.status).toBe(422);
    expect(res.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  test('PUT /produtos/0 retorna 400 com msg de parâmetro inválido', async () => {
    const res = await request.put('/produtos/0').send({
      nome: 'Teste',
      preco: 1.0
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('PUT /produtos/00000000000000000000000 retorna 400 com msg de parâmetro inválido', async () => {
  const res = await request.put('/produtos/00000000000000000000000').send({
    nome: 'Teste',
    preco: 1.0
  });
  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
});

  test('DELETE /produtos/:id válido retorna 204 sem conteúdo', async () => {
    const res = await request.delete(`/produtos/${produtoId}`);
    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
  });

  test('DELETE /produtos/0 retorna 400 com msg de parâmetro inválido', async () => {
    const res = await request.delete('/produtos/0');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('DELETE /produtos/00000000000000000000000 retorna 400 com msg de parâmetro inválido', async () => {
  const res = await request.delete('/produtos/00000000000000000000000');
  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
});

});