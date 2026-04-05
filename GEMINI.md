# ah-shop

Next.js App Router app: routes, layouts, and pages live under `src/app/` (not a top-level `app/` directory). Server actions are in `src/app/actions/`.

**Stack:** Next.js 16.2, React 19, TypeScript 5, Tailwind CSS 4, ESLint 9 (`eslint-config-next`). UI helpers include `clsx`, `tailwind-merge`, `framer-motion`, and `lucide-react`.

`AGENTS.md` in this repo carries the same cross-tool Next.js rules summarized below.

## Next.js (must-follow)

This is NOT the Next.js you know from older docs or training cutoffs. This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Workflow

From the repository root:

- `npm run dev` — development server
- `npm run build` — production build
- `npm run lint` — ESLint

## Scope

Keep changes focused on the task. Follow existing patterns and structure under `src/`.
