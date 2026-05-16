# CostCal

> **เช็กก่อนขาย ว่ากำไรเหลือจริงกี่บาท** — All-in-One Profit Calculator สำหรับผู้ประกอบการไทย

Built with Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Supabase.

---

## Tech Stack

| Layer       | Tool                                       |
| ----------- | ------------------------------------------ |
| Framework   | Next.js 15 (App Router) + React 19         |
| Language    | TypeScript (strict + `noUncheckedIndexedAccess`) |
| Styling     | Tailwind CSS v4 (CSS-first config)         |
| UI          | shadcn/ui (button, input, card)            |
| Auth + DB   | Supabase (browser + server clients via `@supabase/ssr`) |
| Deploy      | Vercel                                     |
| Font        | Noto Sans Thai (next/font)                 |
| Icons       | lucide-react                               |

---

## Local Setup

```bash
# 1. Install deps
npm install

# 2. Copy env template
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The Coming Soon page works **without** Supabase — the `/api/subscribe` route degrades gracefully and just logs the email server-side until env vars are present.

---

## Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial Next.js + shadcn + Supabase scaffold"
gh repo create costcal --public --source=. --push
```

### 2. Import to Vercel

1. Go to <https://vercel.com/new>
2. Import the `costcal` repo
3. Framework preset: **Next.js** (auto-detected)
4. Add environment variables (Settings → Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL`
5. Click **Deploy**

You'll get a free `*.vercel.app` URL within ~60s.

### 3. Connect Custom Domain

1. Buy domain (Namecheap / Cloudflare Registrar — ~400฿/yr for `.com`)
2. In Vercel: Project → Settings → Domains → **Add**
3. Vercel shows DNS records to add at your registrar:
   - `A` record `@` → `76.76.21.21`
   - `CNAME` record `www` → `cname.vercel-dns.com`
4. SSL provisions automatically within minutes.

### 4. Set Up Supabase

1. Go to <https://supabase.com>, create new project (free tier)
2. Once provisioned: **Settings → API** → copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (server-only — never expose)
3. **SQL Editor** → paste & run `supabase/migrations/0001_subscribers.sql`
4. Add the env vars to both `.env.local` and Vercel project settings, redeploy.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout + Noto Sans Thai + Header/Footer
│   ├── page.tsx                # Coming Soon landing page
│   ├── globals.css             # Tailwind v4 + design tokens
│   └── api/
│       └── subscribe/route.ts  # Email capture endpoint
├── components/
│   ├── ui/                     # shadcn primitives (button, input, card)
│   ├── layout/                 # Header, Footer
│   └── landing/                # EmailCapture
└── lib/
    ├── utils.ts                # cn(), formatTHB()
    └── supabase/
        ├── client.ts           # Browser client
        └── server.ts           # Server client (cookies + SSR)

supabase/
└── migrations/
    └── 0001_subscribers.sql    # Day 1 schema
```

---

## Roadmap

This scaffold is **Day 1** of the 14-day MVP build. Next:

- **Day 2** — full Supabase schema (profiles, calculations, subscriptions) per `MASTER_DOCUMENT cal.md` §9
- **Day 3-4** — `/calc/online-seller` page with real fee math (Shopee, Lazada, TikTok, Facebook)
- **Day 5** — `/calc/food-delivery` page (Grab, LINE MAN, Foodpanda, ShopeeFood, Robinhood)
- **Day 6-7** — Auth (signup/login/verify) via Supabase Auth + Resend
- **Day 8-9** — GBPrimePay checkout + webhook
- **Day 10-14** — save/history, admin panel, full landing, polish, launch

See `MASTER_DOCUMENT cal.md` for the full plan.

---

## Scripts

```bash
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Production build
npm run start      # Run production build locally
npm run lint       # Next.js ESLint
npm run typecheck  # tsc --noEmit
```

---

## License

Proprietary — © 2026 CostCal.
