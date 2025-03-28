# Usa a imagem base do Node.js
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o diretório Frontend para dentro do container
COPY ./Frontend ./Frontend

# Copia o diretório Backend para dentro do container (se necessário)
COPY ./Backend ./Backend

# Expose a porta que o http-server vai usar
EXPOSE 5000

# Define o diretório de trabalho para o frontend
WORKDIR /usr/src/app/Frontend

# Comando para rodar o http-server
CMD ["npx", "http-server", "-p", "5000"]
