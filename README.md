# Estoque Mind Grupo (Backend)

Este repositório é um projeto feitto para o processo seletivo da Mind Group. Ele é um servidor Node.JS com Express, que é o backend para o [Frontend](https://github.com/rafosos/estoque-mind-group-frontend).

## Configurando o servidor

### .env

O servidor lê as informações de um arquivo .env, que deve ser criado na raiz do projeto, com estrutura semelhante à seguinte:

```
PORT=3000 //porta do servidor backend
DB_HOST= //seu ip
DB_USER= //nome de usuario do banco de dados
DB_PASSWORD= //senha do usuário do banco de dados
DB_NAME=estoqueMindGroup
JWT_PASSWORD=estoque
```

Para iniciar o servidor, primeiro execute o arquivo [sql-create-database.sql](https://github.com/rafosos/estoque-mind-group-back/blob/main/sql-create-database.sql) para criação do banco de dados. Em seguida, execute o comando abaixo para iniciar em modo de desenvolvimento:

```bash
npm run dev
```
