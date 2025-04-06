import request from "supertest";
import { app } from "@src/app";
import { beforeAll, afterAll, describe, expect, it } from "vitest";

describe("Get All Simulations (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list all simulations of a student", async () => {
    await request(app.server)
      .post("/api/register")
      .send({
        nome: "Carlos",
        sobrenome: "Oliveira",
        email: "carlos@example.com",
        senha: "123456",
      });

    const authResponse = await request(app.server)
      .post("/api/login")
      .send({
        email: "carlos@example.com",
        password: "123456",
      });

    const { token } = authResponse.body;

    await request(app.server)
      .post("/api/simulations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        valor_total: 5000,
        quantidade_parcelas: 5,
        juros_ao_mes: 1.5,
      });

    await request(app.server)
      .post("/api/simulations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        valor_total: 12000,
        quantidade_parcelas: 12,
        juros_ao_mes: 2.2,
      });

    const getAllResponse = await request(app.server)
      .get("/api/simulations")
      .set("Authorization", `Bearer ${token}`);

    expect(getAllResponse.statusCode).toBe(200);
    expect(getAllResponse.body.simulations).toHaveLength(2);
    expect(getAllResponse.body.simulations[0]).toHaveProperty("id");
    expect(getAllResponse.body.simulations[0]).toHaveProperty("valor_total");
  });
});
