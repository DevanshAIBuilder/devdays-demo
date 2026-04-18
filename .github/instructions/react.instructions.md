---
applyTo: "apps/web/**/*.{ts,tsx}"
description: "Next.js + React conventions"
---
- Prefer Server Actions for mutations; use `useActionState` on forms.
- All forms: zod schema in `packages/shared`, reused on server.
- Styling: Tailwind v4 utility classes only, no inline styles.
- A11y: label every input; visible focus rings.
