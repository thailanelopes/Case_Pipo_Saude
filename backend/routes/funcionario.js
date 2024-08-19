const express = require('express');
const router = express.Router();
const { adicionarFuncionario } = require('../controllers/FuncionarioController');

router.post('/incluirFuncionario', adicionarFuncionario);

module.exports = router;
