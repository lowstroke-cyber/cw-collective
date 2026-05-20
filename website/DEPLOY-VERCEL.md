# Deploying to Vercel — `cw-collective.uk`

This guide assumes:
- You own `cw-collective.uk` (DNS can live anywhere — Cloudflare, Namecheap, etc).
- You have a Vercel account.

The site is a static prototype that lives at `ui_kits/website/`. The booking form posts to a Vercel Serverless Function (`api/booking.js`) which forwards the message to `management@longspaces.com` via Resend.

> If you also see `functions/api/booking.js` and `DEPLOY.md` — that's the Cloudflare Pages version. Ignore those when deploying to Vercel; Vercel only looks at `api/`.

---

## One-time setup

### 1. Push the site to a Git repository
Vercel deploys from Git. Push **either**:
- The whole design-system project, OR
- Just the `ui_kits/website/` folder (cleaner — recommended)

GitHub, GitLab, or Bitbucket. Private is fine.

### 2. Sign up for Resend (transactional email)
- Go to <https://resend.com> and create an account.
- Add the domain `cw-collective.uk` and follow their DNS setup. They give you 3–4 DNS records (DKIM, SPF, return-path) to add wherever your DNS lives. The Resend UI verifies in a minute or two.
- Once verified, **API Keys → Create API Key**. Copy it.

Free tier: 3000 emails / month, 100 / day — more than enough for a booking form.

### 3. Import the project into Vercel
- Vercel dashboard → **Add New… → Project** → **Import Git Repository** → pick the repo.
- **Configure Project**:
  - **Framework Preset**: *Other* (it's static HTML + a serverless function).
  - **Root Directory**: `ui_kits/website` if you pushed the whole project, or leave blank if you pushed only that folder.
  - **Build & Output Settings**: leave **Build Command** and **Output Directory** empty/default. Nothing to build — `index.html` is served as-is.
- Click **Deploy**. First deploy takes ~30 seconds. You'll get a temporary URL like `cw-collective-xyz.vercel.app`.

### 4. Set environment variables
- Inside the Vercel project: **Settings → Environment Variables**.
- Add three, scoped to **Production** (and **Preview** if you want PR previews to send mail too):
  - `RESEND_API_KEY` = the key from Resend
  - `BOOKING_FROM`   = `bookings@cw-collective.uk` (or any address on your verified Resend domain)
  - `BOOKING_TO`     = `management@longspaces.com`
- **Deployments → top deployment → ⋯ → Redeploy** so the function picks up the env vars.

### 5. Point `cw-collective.uk` at Vercel
- Inside the Vercel project: **Settings → Domains → Add** → enter `cw-collective.uk`.
- Vercel shows you either:
  - **Nameserver** instructions (point your domain's nameservers at Vercel — easiest), or
  - **A / CNAME records** to add at your current DNS provider (use this if your DNS lives at Cloudflare or anywhere else you want to keep).
- Apply the records. SSL provisions automatically in 30–60 seconds once DNS resolves.
- Add `www.cw-collective.uk` too and let Vercel redirect it to the apex.

---

## Test the booking form

After deploy:
1. Visit `https://cw-collective.uk/#/programme` (the Live page).
2. Fill out the form, click **Send enquiry**.
3. You should see "Thank you — your enquiry is on its way." in the panel.
4. The email lands at `management@longspaces.com` within a few seconds. `Reply-To` is set to the enquirer's address, so replying goes back to them.

If something fails, check:
- Vercel project → **Logs** (or **Observability → Logs**). Real-time logs of every request to `/api/booking`.
- Resend → **Logs**. Delivery status for every send attempt.

---

## Local development (optional)

To run the function locally before deploying:

```bash
npm i -g vercel
cd ui_kits/website
vercel dev
```

That serves the static files and runs `api/booking.js` at `http://localhost:3000/api/booking`. `vercel env pull` will copy your production env vars to a local `.env` so the function has its Resend key.

---

## Performance notes

This is a "Babel-in-the-browser" prototype, not a production build:
- `babel.min.js` is loaded from a CDN and transpiles JSX on every page load.
- First paint is fine; first-time visitors see a brief render delay (~200–500ms).
- Subsequent visits are cached and fast.

If you want production-grade performance (instant first paint, SEO, smaller payload), the next step is to convert the prototype to a pre-compiled static build. Separate task, roughly 1–2 sessions of work. Tell me when you'd like to do it.

---

## What this deployment doesn't include yet

- `robots.txt` and `sitemap.xml` (worth adding when ready to be indexed).
- Open Graph / Twitter Card meta tags on individual routes (currently only on the root HTML).
- Analytics (Vercel Web Analytics is one click in **Project → Analytics**).
- Production-optimised JavaScript / pre-compiled JSX.

Each of these is a small addition — say the word and we'll do them in a single pass.
