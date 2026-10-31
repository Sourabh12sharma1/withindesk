# Git upload guide

## GitHub Desktop

1. Extract `WithinDesk-NodeJS-Git-Source.zip`.
2. Open GitHub Desktop.
3. Choose **File > Add local repository**.
4. Select the extracted `withindesk` folder.
5. If prompted, choose **Create a repository**.
6. Commit all files and select **Publish repository**.

## Command line

From the extracted `withindesk` folder:

```bash
git init
git add .
git commit -m "Initial WithinDesk website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

## Before making the repository public

- Confirm the product spelling and domain.
- Add the legal entity and privacy contact.
- Do not add `.env`, credentials, customer files, or production database exports.
- Keep `node_modules`, `dist`, `.wrangler`, and local runtime folders out of Git.
