# StudySync

StudySync is a student productivity workspace for organizing assignments, deadlines, priorities, and group projects. It gives college students a focused view of what needs attention next while keeping collaboration progress visible.

## Project links

- Repository: https://github.com/devinephoebe433-eng/studysync-team-project
- Production: https://studysync-team-project-git-feature-task-pr-151c06-web-services4.vercel.app/
- Specification: [docs/SPECIFICATION.md](docs/SPECIFICATION.md)

## Demo access

The protected routes require a session cookie. Use the seeded demo account:

- Email: `jordan@studysync.app`
- Password: `studysync2026`

The app supports login, sign-up, protected routes, and logout. New accounts use the same server-side demo store in the current coursework build.

## Views and user flows

- `/` — overview dashboard with workload summary, search, filters, deadlines, and project progress.
- `/tasks` — API-backed task list with Create, Read, Update, Complete, and Delete actions.
- `/projects` — API-backed project list with Create, Read, Update status/progress, and Delete actions.
- `/calendar` — chronological deadline view populated from the tasks API.

## Local setup

```bash
npm install
npm run dev
```

Open http://localhost:3000. Validate the production build with:

```bash
npm run lint
npm run build
```

## Architecture and API

The project uses the Next.js App Router, TypeScript, Tailwind CSS, client components for interactive forms, and server Route Handlers for protected data access. The shared data adapter in `lib/data.ts` provides seeded records and typed CRUD operations; it is intentionally isolated so it can be replaced with a hosted relational database without changing the UI contract.

Authentication endpoints:

- `POST /api/auth/login` — create a session cookie.
- `POST /api/auth/signup` — create a user and session cookie.
- `POST /api/auth/logout` — clear the session cookie.
- `GET /api/auth/me` — check authentication state.

Task endpoints:

- `GET /api/tasks` and `POST /api/tasks`
- `GET /api/tasks/:id`, `PATCH /api/tasks/:id`, and `DELETE /api/tasks/:id`

Project endpoints:

- `GET /api/projects` and `POST /api/projects`
- `GET /api/projects/:id`, `PATCH /api/projects/:id`, and `DELETE /api/projects/:id`

The `/tasks`, `/projects`, and `/calendar` client views consume these protected APIs, demonstrating a client → Route Handler → typed data-layer flow.

## Team and workflow

This is an individual coursework project completed by **Nabugobero Devine**, who served as the project lead. Feature work is developed on branches and merged into `main` through pull requests where available.

## Known issues and opportunities

- The current data adapter is an in-memory seeded store. A production release should connect `lib/data.ts` to a hosted relational database and add migrations.
- Passwords are demo-only in this coursework build. Production authentication should hash passwords and use a managed identity provider or secure database-backed sessions.
- Project member assignment and persistent collaboration are prepared in the data model but need a database and user relationship layer.
- Lighthouse scores should be recorded from an incognito mobile audit before final submission.

## Assignment documents

- [Project specification](docs/SPECIFICATION.md)
- [Team meeting summary template](docs/TEAM_MEETING_SUMMARY.md)
- [Code standards](docs/CODE_STANDARDS.md)
- [Rendered-site review template](docs/TEAM_CODE_REVIEW_REPORT.md)
- [Project board plan](docs/PROJECT_BOARD.md)
