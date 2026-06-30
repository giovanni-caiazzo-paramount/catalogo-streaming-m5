import type { Response } from "express";

// Risposta d'errore in formato Problem Details (RFC 9457).
export function problem(
  res: Response,
  status: number,
  title: string,
  detail: string,
): void {
  res
    .status(status)
    .type("application/problem+json")
    .json({ type: "about:blank", title, status, detail });
}
