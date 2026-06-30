import { beforeEach, describe, expect, it } from "vitest";
import { UserRepository } from "../repository/userRepository";
import { UserService } from "../services/userService";

describe("UserService", () => {
  let svc: UserService;
  beforeEach(() => {
    svc = new UserService(new UserRepository());
  });

  it("getPublicById ritorna il DTO pubblico dell'utente", () => {
    const user = svc.getPublicById("u1");
    expect(user).toEqual({
      id: "u1",
      name: "Ada Lovelace",
      email: "ada@example.com",
      role: "admin",
    });
  });

  it("getPublicById NON espone campi sensibili (passwordHash)", () => {
    const user = svc.getPublicById("u1");
    expect(user).not.toBeNull();
    expect(user).not.toHaveProperty("passwordHash");
    expect(Object.keys(user ?? {}).sort()).toEqual([
      "email",
      "id",
      "name",
      "role",
    ]);
  });

  it("getPublicById ritorna null se l'utente non esiste", () => {
    expect(svc.getPublicById("inesistente")).toBeNull();
  });
});
