const express = require('express');
const router = express.Router();
const Beneficio = require('../models/Beneficio');

router.get('/', async (req, res) => {
  try {
    const beneficios = await Beneficio.find();
    res.json(beneficios);
  } catch (error) {
    console.error('Erro ao listar benefícios:', error.message);
    res.status(500).json({ error: 'Erro ao listar benefícios' });
  }
});

module.exports = router;
