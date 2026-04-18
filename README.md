# Munch Media — Client Site Template

Built by Zhi Lin / Munch Media. This template is the starting point for every client restaurant website.

---

## Setup

1. Clone or copy this template into a new project folder
2. Run `npm install`
3. Copy `.env.example` to `.env.local` and fill in values
4. Connect to a new GitHub repo and import into Vercel

## Environment Variables

Add these to Vercel → Project Settings → Environment Variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Zhi's Supabase URL (same for all clients) |
| `SUPABASE_SERVICE_ROLE_KEY` | Zhi's Supabase service key (same for all clients) |
| `CLIENT_ID` | This client's UUID from Supabase clients table |
| `GOOGLE_CALENDAR_API_KEY` | Zhi's Google Calendar API key (same for all clients) |
| `DISCORD_WEBHOOK_URL` | New webhook per client for contact form |

---

## File Guide

### Always include (all tiers)
- `lib/supabase.js` — Supabase client
- `lib/google-calendar.ts` — Google Calendar API logic
- `app/api/google-calendar/public-events/route.ts` — Calendar events API
- `app/api/contact/route.ts` — Contact form webhook
- `app/events/page.tsx` — Events page (reads from Google Calendar)
- `components/google-calendar/upcoming-events-calendar.tsx` — Events display component
- `app/globals.css` — Base styles (customize colors/fonts per client)
- `app/layout.tsx` — Root layout (customize fonts/metadata per client)
- `app/page.tsx` — Homepage (build from scratch per client)

### Premium tier only (Instagram)
- `lib/instagram.js` — getPosts/getPost helper
- `app/blog/page.tsx` — Instagram posts listing
- `app/blog/[slug]/page.tsx` — Individual post page

### Customization checklist
- [ ] Update `app/globals.css` with client brand colors and fonts
- [ ] Update `app/layout.tsx` with client name, description, and fonts
- [ ] Build `app/page.tsx` homepage based on tier
- [ ] Add all environment variables to Vercel
- [ ] Connect client's Google Calendar via munchmedia.design/google-calendar-test
- [ ] For Premium: complete Instagram onboarding via munchmedia.design/api/instagram/connect

---

## Deployment

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/ZhiHaoLin1/repo-name.git
git push -u origin main
```

Then import the repo in Vercel — it will auto-deploy on every push to main.
