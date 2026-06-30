import { seedUsers } from "../data/seed";
import type { User } from "../types";

/**
 * Repository in-memory degli utenti. Incapsula l'accesso ai dati così che il
 * service non costruisca query a mano. Iniettabile: nei test puoi passare un
 * seed dedicato. In un backend reale userebbe query parametrizzate del driver.
 */
export class UserRepository {
  private store: Map<string, User>;

  constructor(seed: User[] = seedUsers) {
    this.store = new Map(seed.map((u) => [u.id, { ...u }]));
  }

  findById(id: string): User | null {
    return this.store.get(id) ?? null;
  }
}
