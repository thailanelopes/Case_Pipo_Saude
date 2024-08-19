const mongoose = require('mongoose');
const Funcionario = require('../models/Funcionario');
const Beneficio = require('../models/Beneficio');

const adicionarFuncionario = async (req, res) => {
  const { nome, cpf, beneficios, dataAdmissao, email, empresa } = req.body;
  console.log('Dados recebidos:', { nome, cpf, beneficios, dataAdmissao, email, empresa });

  try {
    const beneficiosValidados = await Promise.all(beneficios.map(async (b) => {
      if (!mongoose.Types.ObjectId.isValid(b.beneficio)) {
        throw new Error(`ID de benefício inválido: ${b.beneficio}`);
      }
      
      const beneficioExistente = await Beneficio.findById(b.beneficio);
      if (!beneficioExistente) {
        throw new Error(`Benefício com ID ${b.beneficio} não encontrado`);
      }

      beneficioExistente.campos.forEach(campo => {
        if (campo.requerido && !b.dados[campo.nome]) {
          throw new Error(`Campo ${campo.nome} é obrigatório para o benefício ${beneficioExistente.nome}`);
        }
      });

      return {
        beneficio: beneficioExistente._id,
        dados: b.dados
      };
    }));

    const funcionario = new Funcionario({
      nome,
      cpf,
      dataAdmissao,
      email,
      empresa,
      beneficios: beneficiosValidados
    });

    await funcionario.save();
    res.status(201).json({ nome, cpf, beneficios, dataAdmissao, email, empresa });
  } catch (error) {
    console.error('Erro ao adicionar funcionário:', error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { adicionarFuncionario };
