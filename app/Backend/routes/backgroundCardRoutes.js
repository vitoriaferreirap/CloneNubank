const express = require('express');
const multer = require('multer');
const backgroud = require('../controller/backgroundCardController');

const router = express.Router();

//upload img 
const imgStorage = multer.memoryStorage();
const imgUpload = multer({ storage: imgStorage });

router.post('/backgroud', imgUpload.single('imagem'), backgroud.createBackgroud);

//retorno de todos os dados
router.get('/backgroud', backgroud.listarBackgroud);

//retorno de dados especificos img
router.get('/backgroud/:filename', backgroud.getBackgroud);


module.exports = router;