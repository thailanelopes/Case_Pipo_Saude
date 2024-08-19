const mongoose = require('mongoose');

const FuncionarioSchema = new mongoose.Schema({
  nome: String,
  cpf: String,
  dataAdmissao: Date,
  email: String,
  empresa: String,
  beneficios: [{
    beneficio: { type: mongoose.Schema.Types.ObjectId, ref: 'Beneficio' },
    dados: Object
  }]
});


module.exports = mongoose.model('Funcionario', FuncionarioSchema);
