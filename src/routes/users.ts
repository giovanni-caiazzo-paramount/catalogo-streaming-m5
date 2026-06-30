import { Router } from "express";
import { UserService } from "../services/userService";
import { problem } from "../utils/problem";

// Factory: crea un router con uno UserService fresco (stato isolato per i test).
export function createUsersRouter(
  service: UserService = new UserService(),
): Router {
  const router = Router();

  // GET /api/v1/users?id=<id> — ritorna il DTO pubblico dell'utente.
  router.get("/", (req, res) => {
    const id = req.query.id;
    if (typeof id !== "string" || id.trim().length === 0) {
      problem(
        res,
        400,
        "Bad Request",
        "Il parametro 'id' è obbligatorio e deve essere una stringa non vuota",
      );
      return;
    }

    const user = service.getPublicById(id.trim());
    if (!user) {
      problem(res, 404, "Not Found", `Utente ${id} non trovato`);
      return;
    }

    res.json(user);
  });

  return router;
}
