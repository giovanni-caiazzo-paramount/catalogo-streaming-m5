import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../app";

describe("API /api/v1/users", () => {
  it("GET ?id= ritorna 200 con il DTO pubblico", async () => {
    const res = await request(createApp()).get("/api/v1/users?id=u1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: "u1",
      name: "Ada Lovelace",
      email: "ada@example.com",
      role: "admin",
    });
    // Nessun campo sensibile nella risposta.
    expect(res.body).not.toHaveProperty("passwordHash");
  });

  it("GET senza id ritorna 400 in formato Problem Details", async () => {
    const res = await request(createApp()).get("/api/v1/users");
    expect(res.status).toBe(400);
    expect(res.headers["content-type"]).toContain("application/problem+json");
    expect(res.body.status).toBe(400);
  });

  it("GET con id vuoto ritorna 400", async () => {
    const res = await request(createApp()).get("/api/v1/users?id=%20");
    expect(res.status).toBe(400);
  });

  it("GET con id inesistente ritorna 404 in formato Problem Details", async () => {
    const res = await request(createApp()).get("/api/v1/users?id=zzz");
    expect(res.status).toBe(404);
    expect(res.headers["content-type"]).toContain("application/problem+json");
    expect(res.body.status).toBe(404);
  });
});
