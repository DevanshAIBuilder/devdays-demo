# Project instructions for Copilot
- Stack: pnpm workspaces + Turborepo, Next.js 15 App Router, TypeScript strict, NestJS 10, Prisma, SQLite (dev), Tailwind v4.
- Validation: zod on both client and server. Share types from `packages/shared`.
- Components: Server Components by default. Use `"use client"` only when needed.
- Error handling: typed errors with cause; never swallow.
- Tests: Vitest for unit, Playwright for e2e. Co-locate tests as `*.test.ts`.
- Do NOT modify: `prisma/migrations/**`, `.env*`, CI files under `.github/workflows/**`.
- Commands: pnpm dev, pnpm test, pnpm lint, pnpm -F web build.
