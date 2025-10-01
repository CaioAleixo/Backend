const request = require('supertest');
const app = require('../app');

describe('Testes da API de Tarefas', () => {

    let idDaTarefaCriada; 


    test('Deve retornar status 200 e um JSON para GET /tarefas', async () => {
        await request(app)
            .get('/tarefas')
            .expect(200)
            .expect('Content-Type', /json/);
    });


    test('Deve retornar status 201 e um JSON para POST /tarefas', async () => {
        const response = await request(app)
            .post('/tarefas')
            .send({ nome: "Estudar Node", concluida: false })
            .expect(201)
            .expect('Content-Type', /json/);


        idDaTarefaCriada = response.body.id;
        expect(idDaTarefaCriada).toBeDefined();
    });


    test('Deve retornar status 200 e um JSON para GET /tarefas/:id', async () => {
        await request(app)
            .get(`/tarefas/${idDaTarefaCriada}`)
            .expect(200)
            .expect('Content-Type', /json/);
    });


    test('Deve retornar status 404 para GET /tarefas/:id com id inválido', async () => {

        await request(app)
            .get('/tarefas/9999')
            .expect(404)
            .expect('Content-Type', /json/);
    });


    test('Deve retornar status 200 e um JSON para PUT /tarefas/:id', async () => {
        await request(app)
            .put(`/tarefas/${idDaTarefaCriada}`)
            .send({ nome: "Estudar Node e Express", concluida: true })
            .expect(200)
            .expect('Content-Type', /json/);
    });


    test('Deve retornar status 404 para PUT /tarefas/:id com id inválido', async () => {
        await request(app)
            .put('/tarefas/9999')
            .send({ nome: "Tarefa Inexistente" })
            .expect(404)
            .expect('Content-Type', /json/);
    });


    test('Deve retornar status 204 e sem conteúdo para DELETE /tarefas/:id', async () => {
        await request(app)
            .delete(`/tarefas/${idDaTarefaCriada}`)
            .expect(204);
    });


    test('Deve retornar status 404 para DELETE /tarefas/:id com id inválido', async () => {
        await request(app)
            .delete('/tarefas/9999')
            .expect(404)
            .expect('Content-Type', /json/);
    });

});