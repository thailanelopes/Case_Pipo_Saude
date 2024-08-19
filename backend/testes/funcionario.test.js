const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const { adicionarFuncionario } = require('../controllers/FuncionarioController');
app.post('/api/incluirFuncionario', adicionarFuncionario);

describe('POST /api/incluirFuncionario', () => {
  it('should add a funcionario with valid data', async () => {
    const response = await request(app)
      .post('/api/incluirFuncionario')
      .send({
        nome: 'Jade Luna',
        cpf: '02589714793',
        beneficios: [{ id: new mongoose.Types.ObjectId() }], // Atualizado
        dataAdmissao: '2023-08-02',
        email: 'jadeluna@gmail.com',
        planoSaude: '',
        empresa: 'Acme Co'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('nome', 'Jade Luna');
  });

  it('should return 400 if benefit ID is invalid', async () => {
    const response = await request(app)
      .post('/api/incluirFuncionario')
      .send({
        nome: 'Jade Luna',
        cpf: '02589714793',
        beneficios: [{ id: 'invalid-id' }],
        dataAdmissao: '2023-08-02',
        email: 'jadeluna@gmail.com',
        planoSaude: '',
        empresa: 'Acme Co'
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
