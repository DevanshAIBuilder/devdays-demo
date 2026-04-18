---
description: Scaffold a new NestJS endpoint with zod validation and a Vitest test
agent: agent
model: Claude Sonnet 4.6
tools: ['search/codebase', 'editFiles', 'runCommands']
---
Create a new NestJS endpoint in `apps/api` for the resource described below.

Follow these steps exactly:
1. Add a zod schema in `packages/shared/src/schemas/`.
2. Create a controller + service pair in `apps/api/src/<resource>/`.
3. Wire the module into `AppModule`.
4. Write a Vitest test that covers the happy path and one validation failure.
5. Run `pnpm -F api test` and fix until green.

Resource: ${input:resource:e.g. "feedback with id, meetupId, rating(1-5), comment?"}
