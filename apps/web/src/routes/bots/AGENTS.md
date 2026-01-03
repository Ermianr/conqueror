# BOTS ROUTE KNOWLEDGE BASE

**Generated:** 2026-01-02
**Path:** apps/web/src/routes/bots/

## OVERVIEW
TanStack Start route for Discord bot management.

## STRUCTURE
```
bots/
├── -actions/        # Server actions for bot operations
├── -components/     # React components for UI
├── -interfaces/     # TypeScript interfaces for API responses
├── -schemas/        # Zod validation schemas
├── -worker/         # Web Worker with Discord.js client
└── index.tsx        # Route definition and page component
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Route setup | index.tsx | TanStack Router config, SSR disabled |
| Bot creation | -actions/index.ts | Server fns for DB insert and worker start |
| Form UI | -components/bot-create-form.tsx | React form with token validation |
| API types | -interfaces/index.ts | Discord API response interfaces |
| Validation | -schemas/index.ts | Zod schemas for form/action inputs |
| Bot runtime | -worker/index.ts | Discord.js client in Web Worker |

## CONVENTIONS
- Prefixed subdirectories with clean index.ts re-exports
- Server actions use TanStack Start createServerFn
- Web Worker for Discord bot execution
- Form validation via API check before DB operations

## ANTI-PATTERNS
None documented.