const mongoose = require('mongoose');

const BeneficioSchema = new mongoose.Schema({
  nome: String,
  campos: [{
    nome: String,
    requerido: Boolean
  }]
});


module.exports = mongoose.model('Beneficio', BeneficioSchema);
