const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());


// Importar e usar as rotas
const carroselCardsRouter = require('./routes/carroselCardsRoutes');
app.use(carroselCardsRouter);

const duploCardsRouter = require('./routes/duploCardRoutes');
app.use(duploCardsRouter);

const backgroudCardRouter = require('./routes/backgroundCardRoutes');
app.use(backgroudCardRouter);

const blocoCardRouter = require('./routes/blocoCardRoutes');
app.use(blocoCardRouter)

const elementosCardsRouter = require('./routes/elementosCardsRoutes');
app.use(elementosCardsRouter);

const cardCardsRouter = require('./routes/cardCardsRoutes');
app.use(cardCardsRouter);

// Servir arquivos estáticos
const frontendPath = path.join(__dirname, '../Frontend');
app.use(express.static(frontendPath));



// Conectar com MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch((error) => {
        console.error('Erro ao conectar ao MongoDB', error);
    });


    

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor está rodando na porta: ${port}`);
});
