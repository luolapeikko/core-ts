# Development

## Changeset Management

This project uses [Changesets](https://github.com/changesets/changesets) to manage versioning and changelogs. When making changes to the codebase, please follow these steps:

1. Version update: `npx @changesets/cli` interactive
2. Set versions: `npx @changesets/cli version`
3. Push changes.

## Requirements

- Node.js LTS
- pnpm 10+

## Setup

```bash
git clone https://github.com/luolapeikko/core-ts.git
cd core-ts
pnpm install
```

## Scripts

```bash
pnpm build         # Build all packages
pnpm test          # Run tests with coverage
pnpm validate      # TypeScript validation
pnpm lint          # Code linting
pnpm lint:fix      # Auto-fix linting issues
```

## Project Structure (pnpm workspace)

```
core-ts/
├── packages/
│   ├── core-ts-type/           # Type definitions
│   ├── core-ts-error/          # Error utilities
│   ├── core-ts-string/         # String utilities
│   ├── core-ts-number/         # Number utilities
│   ├── core-ts-array/          # Array utilities
│   ├── core-ts-record/         # Record/object utilities
│   ├── core-ts-nullish/        # Null/undefined utilities
│   ├── core-ts-iterable/       # Iterable utilities
│   ├── core-ts-loadable/       # Loadable utilities
│   └── core-ts-async-iterable/ # Async iterable utilities
```
