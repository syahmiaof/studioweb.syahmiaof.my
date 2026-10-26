grant insert on table public.portfolio_projects to anon;

create policy "Admin token can add portfolio projects"
  on public.portfolio_projects
  for insert
  to anon
  with check (
    encode(
      extensions.digest(
        coalesce(current_setting('request.headers', true)::jsonb ->> 'x-portfolio-write-token', ''),
        'sha256'
      ),
      'hex'
    ) = '49985e0aec65d3e9feb74a35aaaf215759b393ce5a5a9db784a9e90d8390a6aa'
  );
