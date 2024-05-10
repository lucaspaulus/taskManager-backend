# Versão do node para a criação da imagem
FROM node:20

# Criação do diretório da aplicação
WORKDIR /app

# Copiar arquivos
COPY package*.json ./

# Instalação das dependências da aplicação
RUN npm install

# Copiar arquivos
COPY . .

# Criar a build do projeto
RUN npm run build

# Configurar a porta da api
EXPOSE 3000

# Comando para iniciar a api
CMD [ "npm", "run","start"]