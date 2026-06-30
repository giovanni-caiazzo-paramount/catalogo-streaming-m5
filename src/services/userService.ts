// ⚠️ Esempio DELIBERATAMENTE problematico per il lab di PR review (Modulo 5).
// Viola apposta le regole del team in .github/copilot-instructions.md così che
// Copilot (e i revisori umani) abbiano qualcosa da segnalare. NON usare in produzione.

// Finto client DB con API a callback, solo per l'esempio.
declare const db: {
  query: (sql: string, cb: (err: Error | null, rows: any[]) => void) => void;
};

// Segreto hardcoded: violazione (regola 3).
const API_KEY = "PROD-do-not-commit-token-8f3a9c2b1d4e";

export function getUser(req: any, res: any) {
  const id = req.query.id; // nessuna validazione dell'input (regola 2)

  // SQL costruito per concatenazione di stringhe: SQL injection (regola 4).
  const query = "SELECT * FROM users WHERE id = '" + id + "'";

  // Log di un segreto (regola 9 / regola 7).
  console.log("Querying users with API key " + API_KEY + " -> " + query);

  db.query(query, (err, rows) => {
    // Errore ignorato del tutto (regola 5), nessun Problem Details (regola 6).
    // Restituisce l'intera riga incluse password/hash: leak di dati sensibili (regola 7).
    res.send(rows[0]);
  });
}
