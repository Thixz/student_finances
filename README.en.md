
# 🧠 Student Loan Simulator - API

[🇧🇷 Leia em pt-br](./README.md)

![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)
![Tests](https://img.shields.io/badge/Tested%20with-Vitest-yellow)
![PRs](https://img.shields.io/badge/PRs-welcome-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-green)
![Fastify](https://img.shields.io/badge/Fastify-Framework-lightgrey)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Perfil-blue?logo=linkedin)](https://www.linkedin.com/in/thiago-da-costa-albuquerque-9a9997180/)

This **API** was built in **Node.js** following the principles of **Clean Architecture**, promoting clear separation of concerns and facilitating code scalability and maintainability.

Its main goal is to allow students to simulate student loans in a simple and accurate way, by entering total amount, number of installments, and monthly interest rate.

Data persistence is handled by **PostgreSQL** and accessed via **Prisma ORM**. API documentation is offered through **Swagger**, providing a user-friendly interface to explore endpoints.

---

## 🚀 Technologies Used

- **Node.js** with **TypeScript**
- **Fastify** – high-performance HTTP server
- **PostgreSQL** – relational database
- **Prisma ORM** – object-relational mapper
- **Zod** – schema validation
- **Swagger** – interactive API documentation
- **Vitest** – unit and end-to-end testing
- **Supertest** – integration testing
- **Clean Architecture** – layered separation for domain, service and infra

---

## 🧩 Features

- ✅ Student registration and authentication
- 🧠 Student loan simulation
- 🧾 Listing simulations by student
- ❌ Simulation deletion
- 🔐 JWT-based authentication
- 📚 Interactive Swagger API documentation
- 🧪 Automated unit and E2E testing
- 🧼 Isolated test environment with UUID-based DB

---

## ⚙️ How to run the project

### ✅ Requirements

- Node.js (v18+)
- NPM
- Docker

---

### 🚀 Installation and Run

1. Clone the repository:

```bash
git clone https://github.com/Thixz/student_finances.git
cd student_finances
```

2. Install dependencies:

```bash
npm install
```

3. Configure your `.env`:

Create both `.env` and `.env.docker` from `.env.example` in the project root:

```env example
DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"
NODE_ENV=dev
PORT=3333
JWT_SECRET="123pin"
```

```env.docker example
DATABASE_URL="postgresql://docker:docker@database_financial:5432/apisolid?schema=public"
NODE_ENV=dev
PORT=3333
JWT_SECRET="123pin"
```

The correct env will be picked depending on the execution context (local or container).

4. Start Docker and bring up the containers:

```bash
docker-compose up -d
```

Please wait until containers are fully initialized.

5. Prepare the database *(ONLY RUN THIS LOCALLY BEFORE `npm run dev`)*:

```bash
npm run prepare-database
```

---

## 🔍 Documentation

Once the server is up, access Swagger docs at:

```
http://localhost:3333/docs
```

---

## 🧪 Running the Tests

### Unit tests:

```bash
npm run test
```

### End-to-End tests:

```bash
npm run test:e2e
```

### Coverage:

```bash
npm run test:coverage
./coverage/index.html   // to open the coverage report from student_finances/coverage/index.html
```

Useful scripts:

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
