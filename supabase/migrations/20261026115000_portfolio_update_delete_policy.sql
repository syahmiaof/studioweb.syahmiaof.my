grant update, delete on table public.portfolio_projects to anon;

drop policy if exists "Admin token can update portfolio projects" on public.portfolio_projects;
create policy "Admin token can update portfolio projects"
  on public.portfolio_projects
  for update
  to anon
  using (
    encode(
      digest(
        coalesce((select (current_setting('request.headers', true)::jsonb) ->> 'x-portfolio-write-token'), ''),
        'sha256'
      ),
      'hex'
    ) = '49985e0aec65d3e9feb74a35aaaf215759b393ce5a5a9db784a9e90d8390a6aa'
  )
  with check (
    encode(
      digest(
        coalesce((select (current_setting('request.headers', true)::jsonb) ->> 'x-portfolio-write-token'), ''),
        'sha256'
      ),
      'hex'
    ) = '49985e0aec65d3e9feb74a35aaaf215759b393ce5a5a9db784a9e90d8390a6aa'
  );

drop policy if exists "Admin token can delete portfolio projects" on public.portfolio_projects;
create policy "Admin token can delete portfolio projects"
  on public.portfolio_projects
  for delete
  to anon
  using (
    encode(
      digest(
        coalesce((select (current_setting('request.headers', true)::jsonb) ->> 'x-portfolio-write-token'), ''),
        'sha256'
      ),
      'hex'
    ) = '49985e0aec65d3e9feb74a35aaaf215759b393ce5a5a9db784a9e90d8390a6aa'
  );
