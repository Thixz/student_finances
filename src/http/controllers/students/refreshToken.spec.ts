import request from "supertest";
import { app } from "../../../app";
import { beforeAll, afterAll, describe, it, expect } from "vitest";

describe("Refresh Token (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to refresh a token using a valid refreshToken cookie", async () => {
    await request(app.server).post("/api/register").send({
      nome: "Jack",
      sobrenome: "Sparrow",
      email: "jack.sparrow@caribbean.com",
      senha: "123456",
    });

    const loginResponse = await request(app.server).post("/api/login").send({
      email: "jack.sparrow@caribbean.com",
      password: "123456",
    });

    const cookies = loginResponse.get("Set-Cookie") ?? [];

    const refreshResponse = await request(app.server)
      .post("/api/refreshToken")
      .set("Cookie", cookies)
      .send();

    expect(refreshResponse.statusCode).toBe(200);
    expect(refreshResponse.body).toEqual({
      token: expect.any(String),
    });
    expect(refreshResponse.get("Set-Cookie")).toEqual(
      expect.arrayContaining([
        expect.stringContaining("refreshToken="),
      ])
    );
  });
});
