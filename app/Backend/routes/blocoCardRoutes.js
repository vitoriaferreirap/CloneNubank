const express = require('express');
const multer = require('multer');
const bloco = require('../controller/blocoCardController');

const router = express.Router();

//upload img 
const imgStorage = multer.memoryStorage();
const imgUpload = multer({ storage: imgStorage });

router.post('/bloco', imgUpload.single('icone'), bloco.createbloco);

//retorno de todos os dados
router.get('/bloco', bloco.listarbloco);

//retorno de dados especificos img
router.get('/bloco/:filename', bloco.getbloco);




module.exports = router;