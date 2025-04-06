import request from "supertest";
import { app } from "@src/app";
import { beforeAll, afterAll, describe, expect, it } from "vitest";

describe("Delete Simulation (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to delete a simulation", async () => {
    await request(app.server)
      .post("/api/register")
      .send({
        nome: "Maria",
        sobrenome: "Ferreira",
        email: "maria@example.com",
        senha: "123456",
      });

    const authResponse = await request(app.server)
      .post("/api/login")
      .send({
        email: "maria@example.com",
        password: "123456",
      });

    const { token } = authResponse.body;

    const simulationResponse = await request(app.server)
      .post("/api/simulations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        valor_total: 8000,
        quantidade_parcelas: 8,
        juros_ao_mes: 2.0,
      });

    const simulationId = simulationResponse.body.simulation.id;

    const deleteResponse = await request(app.server)
      .delete(`/api/simulations/${simulationId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteResponse.statusCode).toBe(204);
  });
});
