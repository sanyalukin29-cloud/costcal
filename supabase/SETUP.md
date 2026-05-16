# Supabase Setup — Step by Step

> Follow once after creating a fresh Supabase project. ~10 minutes total.

---

## 1. Create the project

1. Go to <https://supabase.com> → **Sign in with GitHub** (free tier)
2. Click **New project**
   - Name: `costcal`
   - Database password: generate a strong one — **save it in your password manager**
   - Region: **Southeast Asia (Singapore)** — closest to Thailand
   - Plan: **Free** (500 MB DB, 50K MAU — enough for months)
3. Wait ~2 min for the project to provision

---

## 2. Run the migrations

Go to **SQL Editor** (left sidebar, beaker icon) → **+ New query**

### Step 2a — minimal subscribers table

Paste the contents of `supabase/migrations/0001_subscribers.sql` → **Run** (or Ctrl+Enter).

Expected result: `Success. No rows returned`.

### Step 2b — full schema

Paste the contents of `supabase/migrations/0002_full_schema.sql` → **Run**.

Expected result: `Success. No rows returned`.

If any statement errors, scroll up — usually means a table already exists from a previous run. The migration uses `if not exists` everywhere, so safe to re-run.

---

## 3. Smoke-test the schema

Run each query in the SQL Editor and confirm the result.

```sql
-- 3a. All 7 tables exist
select table_name
from information_schema.tables
where table_schema = 'public'
order by table_name;
-- expect: calculations, fee_rules, products, profiles,
--         subscribers, subscriptions, webhook_logs
```

```sql
-- 3b. RLS enabled on all user-facing tables
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
order by tablename;
-- every row should have rowsecurity = true
```

```sql
-- 3c. Anonymous subscriber insert works (the only public-write policy)
insert into public.subscribers (email, source)
values ('test@example.com', 'setup-smoketest')
returning id, email, source, created_at;
-- expect: 1 row returned with a uuid
```

```sql
-- 3d. Read it back
select * from public.subscribers
where email = 'test@example.com';
-- expect: the row from 3c
```

```sql
-- 3e. Cleanup
delete from public.subscribers where email = 'test@example.com';
-- expect: DELETE 1
```

```sql
-- 3f. check_save_limit function compiles + runs
select public.check_save_limit('00000000-0000-0000-0000-000000000000');
-- expect: false  (unknown user → returns false)
```

If all 6 queries succeed, the schema is wired correctly.

---

## 4. Get your API keys

**Settings → API** (sidebar, gear icon)

Copy these three values:

| Field in dashboard | Goes to env var |
|---|---|
| `Project URL` | `NEXT_PUBLIC_SUPABASE_URL` |
| `anon public` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `service_role` (under "Reveal") | `SUPABASE_SERVICE_ROLE_KEY` ⚠️ server-only — never commit |

---

## 5. Wire env vars

### Local

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

Restart dev server (`Ctrl+C` then `npm run dev`).

### Vercel

Project → **Settings → Environment Variables** → add the same three for **Production / Preview / Development**.

After saving, redeploy: **Deployments** tab → top deployment → ⋯ → **Redeploy**.

---

## 6. Verify end-to-end

1. Open the deployed site (or `localhost:3000`)
2. On the landing page, submit an email in the capture form
3. In Supabase **Table Editor → subscribers** → you should see the new row

If it shows up, the full Supabase pipeline is live.

---

## 7. Regenerating types (optional, future)

`src/types/database.ts` is hand-written today. Once you have the Supabase CLI authed:

```bash
npx supabase login
npx supabase gen types typescript --project-id <your-project-ref> > src/types/database.ts
```

Project ref is the subdomain in your Project URL (e.g., `abcdefgh` from `https://abcdefgh.supabase.co`).
