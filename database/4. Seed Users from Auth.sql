insert into public.users (id, role, status)
select id, 'admin', 'Active' from auth.users where email = 'admin@ed.cna.nl.ca'
union all
select id, 'student', 'Active' from auth.users where email = 'student@ed.cna.nl.ca'
union all
select id, 'company', 'Active' from auth.users where email = 'company@technl.ca';