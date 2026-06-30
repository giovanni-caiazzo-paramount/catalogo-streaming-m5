// Modello di dominio del catalogo streaming.

export type Genre = "action" | "drama" | "comedy" | "documentary" | "sci-fi";

export const GENRES: Genre[] = [
  "action",
  "drama",
  "comedy",
  "documentary",
  "sci-fi",
];

export interface Content {
  id: string;
  title: string;
  genre: Genre;
  durationMinutes: number;
  releaseDate: string; // ISO 8601 (YYYY-MM-DD)
  rating?: number; // 0..10
}

export interface CreateContentInput {
  title: string;
  genre: Genre;
  durationMinutes: number;
  releaseDate: string;
  rating?: number;
}

export interface UpdateContentInput {
  title?: string;
  genre?: Genre;
  durationMinutes?: number;
  releaseDate?: string;
  rating?: number;
}

// Modello utente. `passwordHash` è sensibile e non va MAI esposto via API.
export type UserRole = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

// DTO pubblico: allowlist esplicita dei campi esponibili (no passwordHash).
export interface PublicUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Errore di validazione del dominio: le route lo traducono in 400.
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
