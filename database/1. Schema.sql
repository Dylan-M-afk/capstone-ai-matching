-- ============================================
-- Capstone AI Matching Platform - DB Schema
-- ============================================
-- Run order:
-- 1. Schema.sql
-- 2. RLS Policies.sql
-- 3. New User Trigger.sql
-- 4. Seed Users.sql
-- ============================================

-- USERS
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'student', 'company')),
  status text not null default 'Active' check (status in ('Active', 'Inactive')),
  created_at timestamptz not null default now()
);

-- STUDENT PROFILES
create table public.student_profiles (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  program text,
  skills text[] default '{}',
  experience text,
  availability text,
  preferred_job_type text,
  bio text,
  cv_file_path text,
  cv_text text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- COMPANIES
create table public.companies (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.users(id) on delete cascade,
  company_name text not null,
  contact_person text,
  access_code text not null unique,
  created_by_admin uuid references public.users(id),
  status text not null default 'Active' check (status in ('Active', 'Inactive')),
  created_at timestamptz not null default now()
);

-- JOB POSTS
create table public.job_posts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  title text not null,
  description text,
  required_skills text[] default '{}',
  job_type text,
  location text,
  schedule text,
  status text not null default 'Open' check (status in ('Open', 'Reviewing', 'Closed')),
  created_at timestamptz not null default now()
);

-- APPLICATIONS
create table public.applications (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.users(id) on delete cascade,
  job_id uuid not null references public.job_posts(id) on delete cascade,
  status text not null default 'Submitted' check (status in ('Submitted', 'Reviewing', 'Accepted', 'Rejected')),
  created_at timestamptz not null default now(),
  unique(student_id, job_id)
);

-- MATCH RESULTS
create table public.match_results (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.job_posts(id) on delete cascade,
  student_id uuid not null references public.users(id) on delete cascade,
  score integer check (score >= 0 and score <= 100),
  matched_skills text[] default '{}',
  missing_skills text[] default '{}',
  availability_match text,
  reason text,
  created_at timestamptz not null default now()
);