import request from "supertest";
import { app } from "../../../app";
import { beforeAll, afterAll, describe, it, expect } from "vitest";

describe("Get Student Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should return the authenticated student's profile", async () => {
    await request(app.server).post("/api/register").send({
      nome: "Jane",
      sobrenome: "Doe",
      email: "jane.doe@example.com",
      senha: "123456",
    });

    const authResponse = await request(app.server).post("/api/login").send({
      email: "jane.doe@example.com",
      password: "123456",
    });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server)
      .post("/api/me")
      .set("Authorization", `Bearer ${token}`);

    expect(profileResponse.statusCode).toBe(200);
    expect(profileResponse.body.student).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        nome: "Jane",
        sobrenome: "Doe",
        email: "jane.doe@example.com",
      })
    );
    expect(profileResponse.body.student).not.toHaveProperty("senha");
  });

  it("shouldn't return the student's profile when not authenticated", async () => {
    const profileResponse = await request(app.server)
      .post("/api/me")

    expect(profileResponse.statusCode).toBe(401);
  });
});
