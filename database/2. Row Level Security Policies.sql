-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
alter table public.users enable row level security;
alter table public.student_profiles enable row level security;
alter table public.companies enable row level security;
alter table public.job_posts enable row level security;
alter table public.applications enable row level security;
alter table public.match_results enable row level security;


-- ============================================
-- HELPER FUNCTION (avoids recursive RLS)
-- ============================================
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role = 'admin'
  )
$$ language sql security definer;


-- ============================================
-- USERS
-- ============================================
create policy "Users can view own record"
  on public.users for select
  using (auth.uid() = id);

create policy "Admins can view all users"
  on public.users for select
  using (is_admin());

create policy "Users can insert own record"
  on public.users for insert
  with check (auth.uid() = id);

create policy "Admins can update user status"
  on public.users for update
  using (is_admin());


-- ============================================
-- STUDENT PROFILES
-- ============================================
create policy "Students can view own profile"
  on public.student_profiles for select
  using (auth.uid() = student_id);

create policy "Students can insert own profile"
  on public.student_profiles for insert
  with check (auth.uid() = student_id);

create policy "Students can update own profile"
  on public.student_profiles for update
  using (auth.uid() = student_id);

create policy "Admins can view all profiles"
  on public.student_profiles for select
  using (is_admin());


-- ============================================
-- COMPANIES
-- ============================================
create policy "Admins can manage companies"
  on public.companies for all
  using (is_admin());

create policy "Companies can view own record"
  on public.companies for select
  using (auth.uid() = company_id);


-- ============================================
-- JOB POSTS
-- ============================================

-- Students see only open jobs; companies see their own jobs at any status; admins see all
create policy "Students can view open jobs"
  on public.job_posts for select
  using (
    status = 'Open'
    or exists (
      select 1 from public.companies
      where company_id = auth.uid() and id = job_posts.company_id
    )
    or is_admin()
  );

create policy "Companies can manage own jobs"
  on public.job_posts for all
  using (
    exists (
      select 1 from public.companies
      where company_id = auth.uid() and id = job_posts.company_id
    )
  );

create policy "Admins can manage all jobs"
  on public.job_posts for all
  using (is_admin());


-- ============================================
-- APPLICATIONS
-- ============================================
create policy "Students can view own applications"
  on public.applications for select
  using (auth.uid() = student_id);

create policy "Students can submit applications"
  on public.applications for insert
  with check (auth.uid() = student_id);

create policy "Companies can view applicants"
  on public.applications for select
  using (
    exists (
      select 1 from public.job_posts jp
      join public.companies c on c.id = jp.company_id
      where jp.id = applications.job_id
      and c.company_id = auth.uid()
    )
  );

create policy "Companies can update application status"
  on public.applications for update
  using (
    exists (
      select 1 from public.job_posts jp
      join public.companies c on c.id = jp.company_id
      where jp.id = applications.job_id
      and c.company_id = auth.uid()
    )
  );

create policy "Admins can manage all applications"
  on public.applications for all
  using (is_admin());


-- ============================================
-- MATCH RESULTS
-- ============================================
create policy "Students can view own match results"
  on public.match_results for select
  using (auth.uid() = student_id);

create policy "Companies can manage match results"
  on public.match_results for all
  using (
    exists (
      select 1 from public.job_posts jp
      join public.companies c on c.id = jp.company_id
      where jp.id = match_results.job_id
      and c.company_id = auth.uid()
    )
  );

create policy "Admins can manage all match results"
  on public.match_results for all
  using (is_admin());