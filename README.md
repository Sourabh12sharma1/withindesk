# WithinDesk

WithinDesk is a finance-first private AI workspace for regulated teams. This repository contains the public product website, interactive MVP prototype, security architecture pages, and private-beta application flow.

Live preview: https://withindesk-private-ai.workspace-831295.chatgpt.site/

## What is included

- Responsive multi-page product website
- Interactive finance workflow prototype
- Product architecture and security pages
- Private-beta application form
- Cloudflare D1-backed request storage
- Drizzle schema and database migration

## Technology

- TypeScript
- React 19
- Next.js 16
- Hostinger / Node.js standalone deployment
- SQLite via better-sqlite3 + Drizzle ORM

Optional legacy path still present in the repo:

- Vinext + Cloudflare Workers / D1 (`npm run build:sites`, `npm run start:sites`)

## Requirements

- Node.js 22.13 or newer
- npm or pnpm 11+

## Run locally

```bash
npm install
npm run build
npm run start
```

For local development:

```bash
npm run dev
```

The development server opens on `http://localhost:3000`.

## Hostinger Node.js hosting

Hostinger expects a Next.js standalone server at:

```text
dist/standalone/server.js
```

This project now builds that artifact with:

```bash
npm run build
```

Set the Hostinger app settings to:

- Framework: Next.js
- Package manager: npm
- Build script: `build` (`next build --webpack`)
- Output Directory: `dist`
- Start command: `npm run start` or `node dist/standalone/server.js`
- Node version: 22+

Beta requests are stored in a local SQLite file at `data/withindesk.sqlite` by default. Override with `DATABASE_PATH` if needed.

## Important commands

```bash
npm run dev          # Next.js development server
npm run build        # Hostinger-ready standalone production build
npm run start        # Run dist/standalone/server.js
npm run db:generate  # Generate a new migration after schema changes
```

## Upload to GitHub

Do not upload the ZIP itself as the source repository. Extract it first, then run:

```bash
git init
git add .
git commit -m "Initial WithinDesk website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Alternatively, extract the ZIP and drag the extracted files into GitHub's web uploader.

## Project structure

```text
app/          Pages and API routes
components/   Product interface and reusable components
db/           D1 database access and schema
drizzle/      Database migrations
public/       Static assets
worker/       Cloudflare Worker entry point
```

## Deployment note

The default Hostinger / Node.js path stores beta requests in local SQLite (`better-sqlite3`). For multi-instance production, point `DATABASE_PATH` at durable storage or replace the adapter in `db/index.ts` with PostgreSQL / MySQL.

The original Cloudflare D1 + Vinext path remains available through `npm run build:sites` / `npm run start:sites`.

No passwords, API keys, repository credentials, or customer data are included in this package.
