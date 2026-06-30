# Istruzioni per GitHub Copilot — Catalogo Streaming

API Node + Express 5 + TypeScript. Queste regole valgono per **code completion** e per
le **review automatiche delle PR**. Quando rivedi una PR, segnala ogni violazione di queste
regole come commento puntuale e proponi la correzione.

## Stack e comandi
- TypeScript **strict**, Node 22+, Express 5 (CommonJS).
- Lint/format: **Biome** (`npm run lint`, `npm run format`).
- Test: **Vitest** (`npm test`, coverage gate **80%** con `npm run test:coverage`).
- E2E API: **Playwright** fixture `request` (`npm run e2e`), nessun browser.

## Regole di codice (bloccanti in review)
1. **Niente `any`**: tipizza input/output. Preferisci tipi espliciti o `unknown` + narrowing.
2. **Validazione degli input**: ogni dato esterno (query, params, body) va validato prima dell'uso.
3. **Nessun segreto nel codice**: niente API key, token o password hardcoded. Usa variabili d'ambiente.
4. **Niente SQL/where costruiti per concatenazione di stringhe**: usa query parametrizzate per evitare injection.
5. **Gestione errori esplicita**: gestisci sempre il path d'errore; non ignorare callback/Promise rejection.
6. **Errori HTTP in formato Problem Details (RFC 9457)**: `type`, `title`, `status`, `detail`.
7. **Non esporre dati sensibili**: mai restituire o loggare password, hash, token o PII.
8. **Async/await** invece di callback annidate; niente codice bloccante nelle route.
9. **Niente `console.log` di dati sensibili**; il logging applicativo è consentito (`noConsole: off`).
10. **Ogni nuova funzionalità ha test** che mantengano la coverage ≥ 80%.

## Convenzioni di progetto
- Servizi in `src/services/`, accesso ai dati in `src/repository/`, route in `src/routes/`.
- Utility (validazione, formato, paginazione) in `src/utils/`, test in `src/tests/`.
- Nomi descrittivi, funzioni piccole e pure dove possibile.

## Cosa NON segnalare
- Modifiche puramente di processo/CI (`.github/workflows/`) salvo problemi di sicurezza.
- Preferenze stilistiche già gestite da Biome (formattazione automatica).
