const express = require('express');
const multer = require('multer');
const duploCards = require('../controller/duploCardController');

const router = express.Router();

// Configuração para upload de imagens
const imgStorage = multer.memoryStorage();
const imgUpload = multer({ storage: imgStorage });

// Rota para adicionar elementos de texto e uma imagem
router.post('/duploCards', imgUpload.single('imagem'), duploCards.createDuploCards);


// Rota para retornar todos os dados
router.get('/duploCards', duploCards.listarDuploCards);

// Rota para retornar dados específicos (imagem)
router.get('/duploCards/:filename', duploCards.getDuploCards);

module.exports = router;
