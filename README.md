# Caskey Webinar Builder

A web app that collects 10 intake answers and generates a complete 60-minute webinar slide outline and facilitator guide — powered by Claude, built on the Caskey Guide philosophy.

**Live URL (once deployed):** `webinar-builder.billcaskey.com`

---

## File Structure

```
caskey-webinar-builder/
  src/
    App.js          ← All React UI + form logic + API call
    index.js        ← React entry point
  api/
    generate.js     ← Vercel serverless function (proxies Anthropic API)
  public/
    index.html      ← HTML shell
  package.json      ← Dependencies
  README.md         ← This file
```

---

## Deployment Instructions (30–45 minutes)

### Step 1 — Create the GitHub repo

1. Go to github.com and sign in
2. Click **New repository**
3. Name it: `caskey-webinar-builder`
4. Set to **Private**
5. Click **Create repository**
6. Upload all files from this folder into the repo (drag and drop works)

---

### Step 2 — Connect to Vercel

1. Go to vercel.com and sign in (use the same account as the 2X Roadmap)
2. Click **Add New → Project**
3. Find `caskey-webinar-builder` in your GitHub repos and click **Import**
4. Vercel will auto-detect it as a React app
5. Leave all build settings as default
6. **Do not deploy yet** — add the environment variable first (Step 3)

---

### Step 3 — Add the Anthropic API key

In the Vercel project setup screen (before deploying):

1. Scroll to **Environment Variables**
2. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your Anthropic API key (starts with `sk-ant-api03-`)
   - **Environments:** check Production, Preview, and Development
3. Click **Add**

> This is the same API key used in the 2X Roadmap. Copy it from that Vercel project under Settings → Environment Variables.

---

### Step 4 — Deploy

Click **Deploy**. Vercel will build and deploy in about 2 minutes.

Your app will be live at a Vercel URL like:
`caskey-webinar-builder.vercel.app`

---

### Step 5 — Add custom subdomain

To put it at `webinar-builder.billcaskey.com`:

1. In Vercel, go to your project → **Settings → Domains**
2. Click **Add Domain**
3. Type: `webinar-builder.billcaskey.com`
4. Vercel will show you a DNS record to add (a CNAME)
5. Log in to wherever billcaskey.com DNS is managed (GoDaddy, Cloudflare, etc.)
6. Add the CNAME record Vercel gives you
7. Wait 5–15 minutes for DNS to propagate
8. Done — your app is live at the custom domain

---

## Technical Notes

- **API key security:** The Anthropic API key lives only in Vercel's environment variables and is never exposed to the browser. All API calls route through `/api/generate.js` (a serverless function).
- **Max tokens:** Set to 8,000 — required for the full slide outline + facilitator guide output.
- **No email required:** Unlike the 2X Roadmap, this tool generates output directly on screen. Users can copy the result with the "Copy all" button.
- **Auto-deploy:** Any future changes pushed to GitHub will auto-deploy to Vercel.

---

## Updating the System Prompt

The webinar generation instructions live in `api/generate.js` in the `systemPrompt` variable. To update the architecture, voice, or output format — edit that string and push to GitHub. Vercel will redeploy automatically.

---

*billcaskey.com | UPWARD.*
