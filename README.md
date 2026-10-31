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
- Next.js 16 through Vinext
- Cloudflare Workers
- Cloudflare D1
- Drizzle ORM

## Requirements

- Node.js 22.13 or newer
- pnpm 11 or newer

## Run locally

```bash
corepack enable
pnpm install
npm run build
```

Apply the included local D1 migration once:

```bash
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_far_hemingway.sql
```

Start the development server:

```bash
npm run dev
```

The development server normally opens on `http://localhost:5173`.

## Important commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Run the built Worker locally
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

The beta application currently uses Cloudflare D1. If the project is later deployed to a conventional Node.js host, replace the D1 adapter in `db/index.ts` with PostgreSQL, MySQL, or another supported database.

No passwords, API keys, repository credentials, or customer data are included in this package.
