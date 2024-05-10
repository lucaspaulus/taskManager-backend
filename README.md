# Guia Passo a Passo para Inicialização da API

### 1. Clonar o repositório da API:
```shell
git clone https://github.com/lucaspaulus/taskManager-backend
```

### 2. Instalar Dependências:
```shell
npm install
```
## Passo final:
### Iniciar a API Localmente:
```shell
npm run dev
```
### Obs: Siga o passo a passo de instalação do docker conforme o seu sistema operacional: https://docs.docker.com/get-docker/
### Iniciar a API no Docker:

```shell
docker compose up
```
ou
```shell
docker-compose up
```
# Guia de Instalação do MongoDB:

## Instalando o MongoDB:

### 1. Importar Chave Pública:
```shell
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
```

### 2. Criar Lista de Repositórios MongoDB:
```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
```

### 3. Atualizar Pacotes Locais:
```bash
sudo apt update
```

### 4. Instalar Pacotes MongoDB:
```bash
sudo apt install -y mongodb-org
```

## Configurando o MongoDB:

### 1. Iniciar o MongoDB:
```bash
sudo systemctl start mongod
```

### 2. Verificar o Status do MongoDB:
```bash
sudo systemctl status mongod
```

### 3. Configurar Inicialização Automática do MongoDB:
```bash
sudo systemctl enable mongod
```

### Atenção: Autenticação do MongoDB

Para usar o banco de dados local, é necessário configurar a autenticação manualmente. Siga os passos no [link](https://www.mongodb.com/docs/v3.4/tutorial/enable-authentication/).

Após a configuração da autenticação, preencha as variáveis de ambiente no arquivo `.env`:
- DB_USER=
- DB_PASSWORD=

