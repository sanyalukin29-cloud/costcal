-- ============================================
-- Full schema per MASTER_DOCUMENT cal.md §9
-- Run AFTER 0001_subscribers.sql in Supabase SQL Editor.
-- Idempotent — safe to re-run.
-- ============================================

-- pgcrypto for gen_random_uuid (Supabase usually has it; ensure)
create extension if not exists pgcrypto;

-- ============================================
-- 1. profiles  (extends auth.users)
-- ============================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  display_name text,
  avatar_url text,

  -- Subscription
  subscription_tier text default 'free'
    check (subscription_tier in ('free', 'pro', 'business', 'lifetime')),
  subscription_status text default 'active'
    check (subscription_status in ('active', 'paused', 'cancelled', 'past_due')),
  subscription_started_at timestamptz,
  subscription_expires_at timestamptz,
  trial_ends_at timestamptz,

  -- Stats
  total_calculations int default 0,
  last_active_at timestamptz,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create profile when a new auth.users row appears
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================
-- 2. calculations  (history)
-- ============================================

create table if not exists public.calculations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,

  module text not null,           -- 'online-seller' | 'food-delivery' | 'recipe'
  platform text,                   -- 'shopee' | 'grab' | etc.

  inputs jsonb not null,
  outputs jsonb not null,

  notes text,
  is_saved boolean default false,
  tags text[],

  created_at timestamptz default now()
);

create index if not exists idx_calculations_user
  on public.calculations(user_id, created_at desc);

create index if not exists idx_calculations_saved
  on public.calculations(user_id, is_saved)
  where is_saved = true;

-- Bump profile stats on insert
create or replace function public.update_calculation_stats()
returns trigger
language plpgsql
as $$
begin
  update public.profiles
  set
    total_calculations = total_calculations + 1,
    last_active_at = now()
  where id = new.user_id;
  return new;
end;
$$;

drop trigger if exists on_calculation_created on public.calculations;
create trigger on_calculation_created
  after insert on public.calculations
  for each row execute function public.update_calculation_stats();

-- ============================================
-- 3. products  (Phase 2 — saved products)
-- ============================================

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,

  name text not null,
  sku text,
  category text,

  cost_price numeric,
  shipping_cost numeric,

  prices jsonb,                   -- { shopee: 199, lazada: 199, ... }

  notes text,
  is_archived boolean default false,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_products_user
  on public.products(user_id, created_at desc);

-- ============================================
-- 4. fee_rules  (admin-controlled overrides)
-- ============================================

create table if not exists public.fee_rules (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  shop_type text,

  rules jsonb not null,           -- full FeeRules object

  effective_from date not null,
  effective_to date,

  notes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create index if not exists idx_fee_rules_active
  on public.fee_rules(platform, shop_type, effective_from desc);

-- ============================================
-- 5. subscriptions  (payment records)
-- ============================================

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,

  plan text not null,             -- 'pro_monthly' | 'pro_annual' | 'business_monthly' | 'lifetime'
  amount numeric not null,
  currency text default 'THB',

  payment_provider text,          -- 'gbprimepay' | 'omise'
  payment_method text,            -- 'promptpay' | 'credit_card' | 'truemoney'
  payment_id text,                -- external payment ID

  status text default 'pending'
    check (status in ('pending', 'active', 'expired', 'cancelled', 'refunded')),

  started_at timestamptz,
  expires_at timestamptz,
  cancelled_at timestamptz,

  created_at timestamptz default now()
);

create index if not exists idx_subscriptions_user
  on public.subscriptions(user_id, created_at desc);

-- ============================================
-- 6. webhook_logs  (debug payment webhooks)
-- ============================================

create table if not exists public.webhook_logs (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  event_type text,
  payload jsonb,
  processed boolean default false,
  error text,
  created_at timestamptz default now()
);

-- ============================================
-- 7. updated_at auto-touch trigger
-- ============================================

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated on public.profiles;
create trigger trg_profiles_updated
  before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists trg_products_updated on public.products;
create trigger trg_products_updated
  before update on public.products
  for each row execute function public.touch_updated_at();

-- ============================================
-- 8. Free-tier daily save limit helper
-- ============================================

create or replace function public.check_save_limit(p_user_id uuid)
returns boolean
language plpgsql
stable
as $$
declare
  user_tier text;
  daily_count int;
begin
  select subscription_tier into user_tier
  from public.profiles where id = p_user_id;

  if user_tier is null then
    return false;
  end if;

  if user_tier <> 'free' then
    return true;
  end if;

  select count(*) into daily_count
  from public.calculations
  where user_id = p_user_id
    and is_saved = true
    and created_at >= current_date;

  return daily_count < 3;
end;
$$;

-- ============================================
-- 9. Row Level Security
-- ============================================

alter table public.profiles      enable row level security;
alter table public.calculations  enable row level security;
alter table public.products      enable row level security;
alter table public.subscriptions enable row level security;
alter table public.fee_rules     enable row level security;
alter table public.webhook_logs  enable row level security;

-- profiles: own row only
drop policy if exists "profiles select own" on public.profiles;
create policy "profiles select own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own" on public.profiles
  for update using (auth.uid() = id);

-- calculations: own only
drop policy if exists "calc select own" on public.calculations;
create policy "calc select own" on public.calculations
  for select using (user_id = auth.uid());

drop policy if exists "calc insert own" on public.calculations;
create policy "calc insert own" on public.calculations
  for insert with check (user_id = auth.uid());

drop policy if exists "calc update own" on public.calculations;
create policy "calc update own" on public.calculations
  for update using (user_id = auth.uid());

drop policy if exists "calc delete own" on public.calculations;
create policy "calc delete own" on public.calculations
  for delete using (user_id = auth.uid());

-- products: own only (full CRUD)
drop policy if exists "products manage own" on public.products;
create policy "products manage own" on public.products
  for all using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- subscriptions: read own only (writes happen via service role from webhook)
drop policy if exists "subs select own" on public.subscriptions;
create policy "subs select own" on public.subscriptions
  for select using (user_id = auth.uid());

-- fee_rules: read public, write only via service role
drop policy if exists "fee_rules public read" on public.fee_rules;
create policy "fee_rules public read" on public.fee_rules
  for select to anon, authenticated using (true);

-- webhook_logs: no client access (service role only)
-- (no policy = denied for anon/authenticated)
