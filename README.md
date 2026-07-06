# Prashant Agrawal - Personal Portfolio

Personal site of Prashant Agrawal: final-year B.Tech student at IIIT Allahabad and Software Engineer Intern at Locus.sh. Dark, minimal, and fast.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion

## Features

- Dark theme by default with a light mode toggle (system preference aware)
- Live GitHub activity on the home page (repos, stars, top languages) with hourly revalidation
- Live LeetCode and Codeforces ratings on the achievements page
- Per-project engineering deep dives at `/projects/[slug]`
- Contact form backed by a serverless route handler + Resend
- All content lives in `/data` as typed TypeScript, so copy edits never touch UI code
- SEO metadata per page, sitemap, robots, OG tags

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in what you need (everything is optional locally)
npm run dev
```

Open http://localhost:3000.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `GITHUB_TOKEN` | No | Raises GitHub API rate limits for the live stats section |
| `RESEND_API_KEY` | For contact form | Sends contact form email via Resend |
| `CONTACT_FROM_EMAIL` | No | Verified sender address for contact emails |

All external fetches fail soft: if an API is down or a key is missing, the section hides or falls back instead of breaking the page.

## Editing content

Everything you would want to change lives in `/data`:

- `data/site.ts` - name, links, handles, contact details
- `data/projects.ts` - project cards and their detail pages
- `data/experience.ts` - work timeline and journey
- `data/achievements.ts` - hackathons and CP profiles
- `data/skills.ts` - the skills grid

## Deploying to Vercel

1. Push this repo to GitHub
2. Import it at [vercel.com/new](https://vercel.com/new)
3. Add the environment variables above (at minimum `RESEND_API_KEY` if you want the contact form live)
4. Deploy

No other configuration needed. Live stats revalidate hourly via ISR.

## Scripts

```bash
npm run dev     # local dev server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```
