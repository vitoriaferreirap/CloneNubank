const express = require('express');
const multer = require('multer');
const cardCards = require('../controller/cardCardsController');

const router = express.Router();


// Configuração para upload de imagens
const imgStorage = multer.memoryStorage();
const imgUpload = multer({ storage: imgStorage });

// Adiciona elementos de texto e uma imagem
router.post('/cardCards', imgUpload.single('imagem'), cardCards.createCardCards);


//retorno de todos os dados
router.get('/cardCards', cardCards.listarCardCards);

//retorno de dados especificos img
router.get('/cardCards/:filename', cardCards.getCardCards);

module.exports = router;
