import { app } from "@src/app";
import request from "supertest";
import { afterAll, beforeAll, describe, it } from "vitest";

describe("Update Student Password (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should update the student password", async () => {
    await request(app.server).post("/api/register").send({
      nome: "João",
      sobrenome: "Silva",
      email: "joao@email.com",
      senha: "123456",
    });

    const loginResponse = await request(app.server).post("/api/login").send({
      email: "joao@email.com",
      password: "123456",
    });

    const token = loginResponse.body.token;

    await request(app.server)
      .put("/api/me/password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        old_password: "123456",
        new_password: "novaSenha123",
      })
      .expect(204);
  });
});
