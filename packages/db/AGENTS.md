# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-02
**Commit:** f4d920f
**Branch:** main

## OVERVIEW
Drizzle ORM package providing PostgreSQL database layer with schema definitions and migrations.

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Database instance | src/index.ts | Exports pre-configured Drizzle db and eq |
| Schema definitions | src/schema/ | bots.ts table with UUID v7 keys |
| Migration files | src/migrations/ | SQL migrations with _journal.json tracking |
| Config | drizzle.config.ts | PostgreSQL connection and schema paths |
| Package exports | package.json | Conditional exports for controlled API |

## CONVENTIONS
- UUID v7 primary keys via uuid package
- Schema field names may differ from column names
- Environment loaded from sibling web app's .env
- Conditional package.json exports: "." (index) and "./*" (direct imports)
- Workspace deps: "@conqueror/env" for DATABASE_URL validation

## ANTI-PATTERNS
Schema changes not applied to migrations (botDiscordId field missing from SQL).