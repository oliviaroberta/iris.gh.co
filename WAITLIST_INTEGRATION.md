# IRIS waitlist integration

The browser submits to the same-origin `/api/waitlist` endpoint. The Vercel function validates and maps the request, sends it to Google Apps Script, follows the ContentService redirect, and reports success only when the final JSON response contains `success: true`.

## Environment variables

- `GOOGLE_APPS_SCRIPT_URL` (required): the deployed Apps Script `/exec` URL. Keep this server-side; do not prefix it with `VITE_`.
- `WAITLIST_ALLOWED_ORIGINS` (optional): comma-separated production and preview origins. If set, browser requests with another `Origin` are rejected. Example: `https://example.com,https://www.example.com`.

Create `.env.local` for local development (it is ignored by Git):

```dotenv
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/REPLACE_WITH_DEPLOYMENT_ID/exec
WAITLIST_ALLOWED_ORIGINS=http://localhost:3000
```

## Local testing

Vite alone does not execute files in `api/`. From the project root, install or invoke the Vercel CLI, link the project when prompted, and run:

```sh
npx vercel dev
```

Open the URL printed by Vercel CLI (normally `http://localhost:3000`). This serves both Vite and `/api/waitlist`. Run the focused API tests separately with:

```sh
npm run test:waitlist
```

The tests mock Apps Script and use dummy data; they never submit to Google Sheets.

## Vercel configuration

In the Vercel project, add `GOOGLE_APPS_SCRIPT_URL` under Settings > Environment Variables for Production and any Preview environment that should accept submissions. If origin filtering is enabled, set `WAITLIST_ALLOWED_ORIGINS` to the exact public origins for that environment. Redeploy after changing environment variables.

Apps Script must return JSON containing exactly `{ "success": true }` only after the row has been written. Any other response is treated as a failure. A timeout is reported as an uncertain result because the upstream write may have completed even though confirmation did not reach Vercel; users are asked to wait before retrying.
