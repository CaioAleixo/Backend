const supertest = require('supertest');

const app = require('../app');

const request = supertest(app);

const url = '/tarefas';

let id = null;

describe('Testes do recurso /tarefas', () => {

    test("POST / deve retornar 201", async () => {
        const response = await request.post(url).send({ nome: "Estudar"});
        expect(response.status).toBe(201);
        id = response.body.id;
    });

    test("GET / deve retornar 200", async () => {
        const response = await request.get(url);
        expect(response.status).toBe(200);
    });

    test("GET / deve retornar 200", async () => {
        const response = await request.get(`${url}/${id}`);
        expect(response.status).toBe(200);
    });

    test("PUT / deve retornar 200", async () => {
        const response = await request.put(`${url}/${id}`).send({nome: "Estudar Express", concluida: true});
        expect(response.status).toBe(200);
    });

    test("DELETE / deve retornar 204", async () => {
        const response = (await request.delete(`${url}/${id}`));
        expect(response.status).toBe(204);
    });

});