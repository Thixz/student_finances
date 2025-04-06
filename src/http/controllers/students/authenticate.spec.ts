import request from "supertest";
import { app } from "../../../app";
import { beforeAll, afterAll, describe, it, expect } from "vitest";

describe("Authenticate Student (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate a student via /api/login", async () => {
    await request(app.server)
      .post("/api/register")
      .send({
        nome: "John",
        sobrenome: "Doe",
        email: "john.doe@gmail.com",
        senha: "123456",
      });

    const response = await request(app.server)
      .post("/api/login")
      .send({
        email: "john.doe@gmail.com",
        password: "123456",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.get("Set-Cookie")).toEqual(
      expect.arrayContaining([expect.stringContaining("refreshToken=")])
    );
  });
});
