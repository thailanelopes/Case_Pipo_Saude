const mongoose = require('mongoose');
const Beneficio = require('./models/Beneficio');
const dotenv = require('dotenv');

dotenv.config();

const criarBeneficios = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const beneficios = [
      { nome: 'Plano de Saúde NorteEuropa', campos: [{ nome: 'Número do Cartão', tipo: 'String', requerido: true }] },
      { nome: 'Plano de Saúde Pampulha Intermédica', campos: [{ nome: 'Número do Cartão', tipo: 'String', requerido: true }] },
      { nome: 'Plano Dental Sorriso', campos: [{ nome: 'Número do Cartão', tipo: 'String', requerido: true }] },
      { nome: 'Plano de Saúde Mental Mente Sã, Corpo São', campos: [{ nome: 'Número do Cartão', tipo: 'String', requerido: true }] },
    ];

    await Beneficio.insertMany(beneficios);
    console.log('Benefícios inseridos com sucesso');
    mongoose.disconnect();
  } catch (error) {
    console.error('Erro ao inserir benefícios:', error.message);
    mongoose.disconnect();
  }
};

criarBeneficios();
