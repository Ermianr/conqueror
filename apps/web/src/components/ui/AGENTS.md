# UI COMPONENTS

**Purpose:** Reusable shadcn/ui components.

## STRUCTURE
```
ui/
├── button.tsx
├── card.tsx
├── checkbox.tsx
├── dropdown-menu.tsx
├── input.tsx
├── label.tsx
├── skeleton.tsx
└── sonner.tsx
```

## WHERE TO LOOK
| Component | Usage |
|-----------|--------|
| button.tsx | Interactive actions |
| card.tsx | Content containers |
| checkbox.tsx | Form checkboxes |
| dropdown-menu.tsx | Menus/selects |
| input.tsx | Form fields |
| label.tsx | Form labels |
| skeleton.tsx | Loading states |
| sonner.tsx | Toast notifications |

## CONVENTIONS
- Each component in separate file
- shadcn/ui patterns (Radix UI primitives + Tailwind)
- Biome sorting for `clsx/cva/cn` class functions (warn level)
- No local config (uses global styles)

## ANTI-PATTERNS
None documented.

## NOTES
Biome config excludes UI components from file processing. Use class sorting helper functions to maintain consistency.
