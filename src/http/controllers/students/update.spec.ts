import request from "supertest";
import { app } from "@src/app";
import { beforeAll, afterAll, describe, it } from "vitest";

describe("Update Student Info (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should update the student's name and surname", async () => {
    await request(app.server).post("/api/register").send({
      nome: "Maria",
      sobrenome: "Oliveira",
      email: "maria@email.com",
      senha: "123456",
    });

    const loginResponse = await request(app.server).post("/api/login").send({
      email: "maria@email.com",
      password: "123456",
    });

    const token = loginResponse.body.token;
    
    await request(app.server)
      .put("/api/me")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Maria Clara",
        sobrenome: "Souza",
      })
      .expect(204);
  });
});
