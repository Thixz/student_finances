import { app } from "@src/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Simulation (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a simulation", async () => {
    await request(app.server)
      .post("/api/register")
      .send({
        nome: "João",
        sobrenome: "Silva",
        email: "joao@example.com",
        senha: "123456",
      });

    const authResponse = await request(app.server)
      .post("/api/login")
      .send({
        email: "joao@example.com",
        password: "123456",
      });

    const { token } = authResponse.body;

    const simulationResponse = await request(app.server)
      .post("/api/simulations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        valor_total: 10000,
        quantidade_parcelas: 10,
        juros_ao_mes: 1.5,
      });

    expect(simulationResponse.statusCode).toBe(201);
  });
});
