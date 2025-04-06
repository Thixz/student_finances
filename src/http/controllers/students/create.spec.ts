import request from "supertest";
import { app } from "@src/app";
import { afterAll, beforeAll, describe, it, expect } from "vitest";

describe("Register Student (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register a new student", async () => {
    const response = await request(app.server)
      .post("/api/register")
      .send({
        nome: "John",
        sobrenome: "Doe",
        email: "john.doe@gmail.com",
        senha: "123456",
      });

    expect(response.status).toBe(201);
  });

  it("shouldn't be able to register a new student with wrong validation", async () => {
    const response = await request(app.server)
      .post("/api/register")
      .send({
        email: "john",
        senha: "123",
      });

    expect(response.status).toBe(400);
  });
});
