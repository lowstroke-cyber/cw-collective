# Deploying to Cloudflare Pages — `cw-collective.uk`

This guide assumes:
- You own `cw-collective.uk` and it's already on Cloudflare.
- You have a Cloudflare account.

The site is a static prototype that lives at `ui_kits/website/`. The booking form posts to a small Cloudflare Pages Function (`functions/api/booking.js`) which forwards the message to `management@longspaces.com` via Resend.

---

## One-time setup

### 1. Push the site to a Git repository
Cloudflare Pages deploys from Git. Push **either**:
- The whole design-system project, OR
- Just the `ui_kits/website/` folder (cleaner — recommended)

Push to GitHub, GitLab, or Bitbucket. Private is fine.

### 2. Sign up for Resend (transactional email)
- Go to <https://resend.com> and create an account.
- Add the domain `cw-collective.uk` and follow their DNS setup. They'll give you 3–4 DNS records (DKIM, SPF, return-path) to add at Cloudflare. The Resend UI verifies in a minute or two.
- Once verified, create an **API key** under *API Keys* → *Create API Key*. Copy it.

Free tier covers 3000 emails / month, 100 / day — more than enough for a booking form.

### 3. Create the Cloudflare Pages project
- Cloudflare dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
- Pick the repository.
- **Build settings**:
  - Framework preset: **None**.
  - Build command: *(leave empty)* — the site is static.
  - Build output directory: `/` if you pushed just the website folder; or `ui_kits/website` if you pushed the whole project.
- Click **Save and Deploy**.

You'll get a temporary URL like `cw-collective.pages.dev` once the first deploy finishes.

### 4. Set environment variables for the Pages Function
- Inside the Pages project: **Settings** → **Environment variables** → **Production**.
- Add:
  - `RESEND_API_KEY` = the key from Resend
  - `BOOKING_FROM`   = `bookings@cw-collective.uk` (or any address on your verified domain)
  - `BOOKING_TO`     = `management@longspaces.com`
- Redeploy (Deployments → top deployment → **Retry deployment**) so the function picks up the env vars.

### 5. Point `cw-collective.uk` at the Pages project
- Inside the Pages project: **Custom domains** → **Set up a domain** → enter `cw-collective.uk`.
- Cloudflare adds the CNAME automatically because the domain is already on Cloudflare.
- SSL is provisioned in 30–60 seconds.

---

## Test the booking form

After deploy:
1. Visit `https://cw-collective.uk/#/programme` (or `/live` once we update the URL — currently it's `/programme` internally).
2. Fill out the form, click **Send enquiry**.
3. You should see "Thank you — your enquiry is on its way." in the panel.
4. The email lands at `management@longspaces.com` within a few seconds. The `Reply-To` is set to the enquirer's address, so replying goes back to them.

If something fails, check:
- Pages → your project → **Functions** → **Logs**. Real-time logs of every request to `/api/booking`.
- Resend → **Logs**. Records of every email send attempt with delivery status.

---

## Performance notes

This is a "Babel-in-the-browser" prototype, not a production build:
- `babel.min.js` is loaded from a CDN and transpiles JSX on every page load.
- First paint is fine; first-time visitors see a brief render delay (~200–500ms).
- Subsequent visits are cached and fast.

If you want production-grade performance (instant first paint, SEO, smaller payload), the next step is **path 2** from the planning conversation — convert the prototype to a pre-compiled static build. That's a separate task and roughly 1–2 sessions of work. Tell me when you'd like to do it.

---

## What this deployment doesn't include yet

- A `robots.txt` and `sitemap.xml` (worth adding when ready to be indexed).
- Open Graph / Twitter Card meta tags on individual routes (currently only on the root HTML).
- Analytics (Cloudflare Web Analytics is free, one-click toggle on the Pages project).
- Press page content (you mentioned working on this).
- Production-optimised JavaScript / pre-compiled JSX.

Each of these is a small addition — say the word and we'll do them in a single pass.
