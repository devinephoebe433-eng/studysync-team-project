# StudySync Code Standards

Use strict TypeScript and avoid `any` unless a documented exception is approved. Use descriptive names for components, routes, data fields, and event handlers. Keep Server Components focused on data and page composition; use Client Components only where interaction or browser APIs require them.

Prefer semantic HTML, visible form labels, keyboard-accessible controls, responsive layouts, and explicit loading, error, and empty states. Use Tailwind utilities for styling and add custom CSS only when a shared pattern cannot be expressed clearly with utilities.

Run `npm run lint` and `npm run build` before opening a pull request. Branch names should describe the work, for example `feature/assignment-crud`, `feature/project-board`, or `fix/mobile-calendar`. Pull requests should explain the user-facing change, list validation performed, and request review from at least one teammate.
