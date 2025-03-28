# Usa a imagem base do Node.js.
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json para instalar as dependências
COPY package*.json ./

COPY ./Frontend ./Frontend

# Define o diretório de trabalho para a raiz do projeto (Frontend ou Backend se necessário)
WORKDIR /usr/src/app
COPY ./Backend ./Backend
RUN npm install

# Expõe a porta para o container
EXPOSE 8080

# Comando para rodar o projeto
CMD ["npm", "start"]
