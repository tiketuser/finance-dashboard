# Repository Guidelines

## Project Structure & Module Organization
- `app/` — Next.js App Router entrypoints, layouts, and global styles (`globals.css`).
- `component/` — Shared UI components (placeholder; add reusable React components here).
- `public/` — Static assets (SVGs, icons).
- Root configs — `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`.

## Build, Test, and Development Commands
- `npm install` — Install dependencies.
- `npm run dev` — Start the Next.js dev server at `http://localhost:3000`.
- `npm run build` — Production build.
- `npm run start` — Serve the production build.
- `npm run lint` — Run ESLint for code quality.

## Coding Style & Naming Conventions
- Language: TypeScript + React (Next.js 16, App Router).
- Linting: ESLint with Next.js config; run `npm run lint` before pushing.
- Formatting: Follow lint rule autofixes; prefer consistent 2-space indentation.
- Components: Use PascalCase for React components and file names (e.g., `DashboardCard.tsx`).
- Utilities/hooks: camelCase (e.g., `formatCurrency.ts`, `useChartData.ts`).
- Styles: Co-locate component-specific styles in the same file; global styles live in `app/globals.css`.

## Testing Guidelines
- Current: No tests committed yet. Add unit/integration tests alongside features (e.g., `component/__tests__/MyComponent.test.tsx`).
- Use React Testing Library or Playwright for UI where applicable.
- Aim for meaningful coverage on data transforms and UI logic that influences user-visible output.
- Include sample data mocks for deterministic results.

## Commit & Pull Request Guidelines
- Commits: Keep short, imperative titles (e.g., `Improve README overview`, `Add Next.js app scaffold`). Group related changes.
- PRs: Describe scope, rationale, and testing performed (`npm run lint`, screenshots for UI changes). Reference issues when applicable.
- Keep diffs focused; avoid mixing refactors with feature work unless necessary.

## Security & Configuration Tips
- Do not commit secrets or `.env` files; `.gitignore` already excludes them.
- Prefer environment variables for API keys; document any new vars in the PR description.
- Validate user input on both client and server when adding data entry paths.
