const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Importar e usar as rotas
const carroselCardsRouter = require("./routes/carroselCardsRoutes");
app.use(carroselCardsRouter);

const duploCardsRouter = require("./routes/duploCardRoutes");
app.use(duploCardsRouter);

const backgroudCardRouter = require("./routes/backgroundCardRoutes");
app.use(backgroudCardRouter);

const blocoCardRouter = require("./routes/blocoCardRoutes");
app.use(blocoCardRouter);

const elementosCardsRouter = require("./routes/elementosCardsRoutes");
app.use(elementosCardsRouter);

const cardCardsRouter = require("./routes/cardCardsRoutes");
app.use(cardCardsRouter);

// Servir arquivos estáticos
const frontendPath = path.join(__dirname, "../Frontend");
app.use(express.static(frontendPath));

// Conectar com MongoDB
mongoose
  .connect(process.env.MONGODB_URI) // Removido useNewUrlParser e useUnifiedTopology
  .then(() => {
    console.log("Conectado ao MongoDB");

    // Inicializa o servidor APÓS conectar ao banco
    app.listen(port, "0.0.0.0", () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error);
  });
