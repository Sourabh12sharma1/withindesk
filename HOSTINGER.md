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

withindesk.com uses this Hostinger MySQL database:

| Setting | Value |
|---|---|
| Database | `u178751471_beta_form` |
| Username | `u178751471_betaform` |
| Host | `localhost` |
| Port | `3306` |
| Table | `beta_requests` (created automatically, or run `sql/hostinger-mysql.sql`) |

Hostinger sets the password automatically and does not show it in that create screen. Reset or copy it in hPanel **Databases → MySQL Databases**, then put it only in the Node.js app environment as `MYSQL_PASSWORD`. Do not commit it.

Confirm the user `u178751471_betaform` has **ALL PRIVILEGES** on `u178751471_beta_form`.

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
MYSQL_USER=u178751471_betaform
MYSQL_PASSWORD=paste-the-hpanel-password-here
MYSQL_DATABASE=u178751471_beta_form
```

Redeploy / restart the app after saving env vars. The password never goes in Git.

## 4. Workflow: form → MySQL → phpMyAdmin

```text
User fills https://withindesk.com/access
        ↓
POST /api/beta
        ↓
Node app creates table beta_requests if missing
        ↓
INSERT into Hostinger MySQL  u178751471_beta_form
        ↓
phpMyAdmin → Databases → u178751471_beta_form → beta_requests → Browse
```

Production **does not** use SQLite. If the MySQL env vars are missing, the form shows an error instead of a fake success.

### Check the live connection

Open:

https://withindesk.com/api/beta

You want:

```json
{
  "ok": true,
  "stored": "mysql",
  "table": "beta_requests",
  "database": "u178751471_beta_form",
  "total": 1
}
```

If `stored` is `unconfigured` or `ok` is false, the Node.js env vars are missing or the password is wrong. Fix them, **restart** the app, then submit the form again.

### See the row in phpMyAdmin

1. hPanel → **Databases → phpMyAdmin**
2. Left: **`u178751471_beta_form`** (must be this database, not another one)
3. Click **`beta_requests`**
4. Tab **Browse**

If the table is still missing after a successful MySQL save, you are looking at the wrong database in phpMyAdmin.

Locally, with no MySQL env vars, the same form still writes to `data/withindesk.sqlite`.
