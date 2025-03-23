# Use uma imagem base do Node.js
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do backend e frontend
RUN npm install

# Copia o diretório Backend e Frontend para o diretório de trabalho
COPY Backend ./Backend
COPY Frontend ./Frontend

# Define o diretório de trabalho para a raiz do projeto
WORKDIR /usr/src/app

# Expõe a porta que o app vai usar
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "start"]