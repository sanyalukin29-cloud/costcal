-- ============================================
-- Day 1 minimum schema — email capture only.
-- Full schema (profiles, calculations, subscriptions, etc.)
-- lands in Day 2 per MASTER_DOCUMENT cal.md section 9.
-- ============================================

create table if not exists public.subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text unique not null,
  source      text,
  created_at  timestamptz default now()
);

-- Allow anonymous inserts (public email capture).
-- Reads are admin-only.
alter table public.subscribers enable row level security;

drop policy if exists "anon insert subscribers" on public.subscribers;
create policy "anon insert subscribers"
  on public.subscribers
  for insert
  to anon
  with check (true);
