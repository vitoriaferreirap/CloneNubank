const express = require('express');
const multer = require('multer');
const elementosCards = require('../controller/elementosCardsController');

const router = express.Router();

//upload img 
const imgStorage = multer.memoryStorage();
const imgUpload = multer({ storage: imgStorage });

router.post('/elementos', imgUpload.single('imagem'), elementosCards.createElementos);

//retorno de todos os dados
router.get('/elementos', elementosCards.listarElementos);

//retorno de dados especificos img
router.get('/elementos/:filename', elementosCards.getElementos);




module.exports = router;