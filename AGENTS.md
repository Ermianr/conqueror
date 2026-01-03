# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-02
**Commit:** f4d920f
**Branch:** main

## OVERVIEW
Bun-based monorepo with TanStack Start fullstack app and Astro docs.

## STRUCTURE
```
conqueror/
├── apps/
│   ├── web/         # TanStack Start + React (port 3001)
│   └── docs/        # Astro Starlight docs (port 4321)
├── packages/
│   ├── config/      # Shared TypeScript config
│   ├── env/         # Environment validation
│   └── db/          # Drizzle ORM layer
└── docker-compose.yml  # PostgreSQL
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Web app entry | apps/web/start.ts | Custom Bun server |
| Route logic | apps/web/src/routes/ | File-based routing |
| DB schema | packages/db/src/schema/ | Drizzle table defs |
| Shared utils | packages/env/src/ | Env validation |
| UI components | apps/web/src/components/ui/ | shadcn/ui |

## CONVENTIONS
- Bun runtime & package manager
- Biome (tabs globally, 2-space for JS)
- Husky pre-commit with lint-staged
- Route subdirs use `-actions`, `-components`, `-interfaces`, `-schemas`, `-worker` prefixes
- Scoped packages: `@conqueror/*`
- Workspace deps referenced as `"workspace:*"`

## ANTI-PATTERNS (THIS PROJECT)
None documented. No tests implemented yet.

## COMMANDS
```bash
bun install                    # Install deps
docker-compose up -d           # Start PostgreSQL
bun run db:push                # Apply schema
bun run dev                    # Start all apps (ports 3001, 4321)
bun run build                  # Build all apps
bun run check                  # Biome lint/format
bun run check-types            # TypeScript check
bun run db:studio              # Drizzle Studio
```

## NOTES
- No CI/CD (no GitHub Actions)
- Testing Library installed but no tests
- README outdated (references non-existent packages/api/)
- PostgreSQL 18-alpine via Docker Compose
