# Hostinger: store private-beta form submissions

Git holds the app. Hostinger holds the live database. Do not commit passwords or the SQLite file.

## What gets stored

Each successful `/access` form submit writes one row to `beta_requests`:

| Column | Form field |
|---|---|
| `email` | Work email (unique) |
| `organization` | Firm |
| `role` | Role |
| `use_case` | First workflow |
| `consent` | Privacy checkbox |
| `created_at` | Server timestamp |

Duplicates of the same email are ignored (`duplicate: true`). The hidden `website` honeypot is never stored.

## 1. Push this repo to Git

From the `withindesk` folder:

```bash
git add .
git commit -m "Store private-beta requests in Hostinger MySQL"
git push
```

Keep `.env`, `.env.local`, and `data/` out of Git. They are already gitignored.

## 2. Create the MySQL database on Hostinger

In hPanel:

1. Open **Databases → MySQL Databases** (or **Management → MySQL Databases**).
2. Create a database, for example `uXXXX_withindesk`.
3. Create a user and grant **ALL PRIVILEGES** on that database.
4. Note host, port, database name, user, and password.
   - On Hostinger Node.js hosting the host is usually `localhost`.
   - Port is usually `3306`.

Optional: in **phpMyAdmin**, run `sql/hostinger-mysql.sql`. If you skip this, the Node app creates the table on the first form submit.

## 3. Connect Git → Hostinger Node.js

In hPanel **Websites → Node.js** (or **Advanced → Node.js**):

- Repository: your GitHub/GitLab repo
- Branch: `main`
- Root directory: `withindesk` if the repo root is the parent folder; leave empty if `withindesk` **is** the repo
- Node version: **22** or newer
- Build command: `npm run build`
- Start command: `npm run start` or `node dist/standalone/server.js`

Add environment variables (same names as `.env.example`):

```text
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=uXXXX_withindesk
MYSQL_PASSWORD=your-db-password
MYSQL_DATABASE=uXXXX_withindesk
```

Redeploy / restart the app after saving env vars.

## 4. Check it

1. Open `https://withindesk.com/access`
2. Submit the private-beta form
3. In phpMyAdmin, open `beta_requests` and confirm the row

Locally, with no MySQL env vars, the same form still writes to `data/withindesk.sqlite`.
