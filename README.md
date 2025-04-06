# 🧠 Simulador de Financiamento Estudantil - API
![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)
![Tests](https://img.shields.io/badge/Tested%20with-Vitest-yellow)
![PRs](https://img.shields.io/badge/PRs-welcome-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-green)
![Fastify](https://img.shields.io/badge/Fastify-Framework-lightgrey)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)


Esta **API** foi desenvolvida em **Node.js** seguindo os princípios da **Clean Architecture**, promovendo uma separação clara de responsabilidades, facilitando a escalabilidade e manutenção do código.

Seu principal objetivo é permitir que estudantes simulem financiamentos estudantis de forma simples e precisa, informando o valor total, quantidade de parcelas e taxa de juros mensal.

A persistência de dados é feita com **PostgreSQL**, utilizando o **PrismaORM** como ferramenta de acesso e mapeamento de dados. A documentação interativa da API é oferecida através do **Swagger**, permitindo uma navegação amigável pelos endpoints disponíveis.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **Fastify** – servidor HTTP rápido e eficiente
- **PostgreSQL** – banco de dados relacional
- **Prisma ORM** – mapeamento objeto-relacional (ORM)
- **Zod** – validação de dados
- **Swagger** – documentação da API
- **Vitest** – testes unitários e E2E
- **Supertest** – testes de integração
- **Clean Architecture** – separação de domínios, serviços e infraestrutura

---

## 🧩 Funcionalidades

- ✅ Cadastro e autenticação de estudantes
- 🧠 Simulação de financiamentos estudantis
- 🧾 Listagem de simulações por estudante
- ❌ Exclusão de simulações
- 🔐 Autenticação com JWT
- 📚 Documentação Swagger acessível e interativa
- 🧪 Testes automatizados (unitários e end-to-end)
- 🧼 Separação de ambiente de testes com banco isolado via UUID

---

## ⚙️ Como rodar o projeto

### ✅ Pré-requisitos

- Node.js (v18+)
- NPM
- Docker

---

### 🚀 Instalação e Execução

1. Clone o repositório:

```bash
git clone https://github.com/Thixz/student_finances.git
cd student_finances
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o `.env`:

Crie o arquivo `.env` com base no `.env.example` na raiz do projeto:

```env
DATABASE_URL="postgresql://docker:docker@database_financial:5432/apisolid?schema=public"
NODE_ENV=dev
PORT=3333
JWT_SECRET="123pin"
```

4. Inicie o docker e suba os containers da aplicação e do db postgres:

```bash
docker-compose up -d
```

5. Prepare o database (generate do schema prisma e run das migrations):

```bash
npm run prepare-database
```

---

## 🔍 Documentação

Após subir o servidor, a documentação Swagger estará disponível em:

```
http://localhost:3333/docs
```

---

## 🧪 Rodando os Testes

### Testes Unitários:

```bash
npm run test
```

### Testes End-to-End:

```bash
npm run test:e2e
```

### Teste Coverage:

```bash
npm run test:coverage
./coverage/index.html
```

Scripts importantes:

```json
"scripts": {
  "dev": "ts-node-dev src/server.ts",
  "test": "vitest run --dir src/modules",
  "test:e2e": "vitest run --dir src/http",
  "test:e2e:watch": "vitest --dir src/http",
  "test:create-prisma-environment": "npm link ./prisma/vitest-environment-prisma",
  "test:install-prisma-environment": "npm link vitest-environment-prisma",
  "pretest:e2e": "run-s test:create-prisma-environment test:install-prisma-environment"
}
```
