import { UserRepository } from "../repository/userRepository";
import type { PublicUser, User } from "../types";

/**
 * Mappa un User di dominio sul DTO pubblico: allowlist esplicita dei campi
 * esponibili. `passwordHash` (e qualsiasi futuro campo sensibile) resta fuori.
 */
function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

/**
 * UserService — logica di business sugli utenti. Funzione pura e tipizzata:
 * nessun accesso a req/res, nessuna query a mano. Dipende da UserRepository
 * (iniettabile nei test).
 */
export class UserService {
  constructor(private readonly repo: UserRepository = new UserRepository()) {}

  // Ritorna il DTO pubblico dell'utente, o null se non esiste.
  getPublicById(id: string): PublicUser | null {
    const user = this.repo.findById(id);
    return user ? toPublicUser(user) : null;
  }
}
