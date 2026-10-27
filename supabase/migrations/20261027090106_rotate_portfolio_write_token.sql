-- Rotate the server-only portfolio write token; store only its SHA-256 digest in RLS.
alter policy "Admin token can add portfolio projects"
  on public.portfolio_projects
  with check (encode(extensions.digest(coalesce((select current_setting('request.headers', true)::jsonb ->> 'x-portfolio-write-token'), ''), 'sha256'), 'hex') = '6ed22b97a79d205ae4800f46023913013c93af72c891e72166ef63d1a09da26d');

alter policy "Admin token can update portfolio projects"
  on public.portfolio_projects
  using (encode(extensions.digest(coalesce((select current_setting('request.headers', true)::jsonb ->> 'x-portfolio-write-token'), ''), 'sha256'), 'hex') = '6ed22b97a79d205ae4800f46023913013c93af72c891e72166ef63d1a09da26d')
  with check (encode(extensions.digest(coalesce((select current_setting('request.headers', true)::jsonb ->> 'x-portfolio-write-token'), ''), 'sha256'), 'hex') = '6ed22b97a79d205ae4800f46023913013c93af72c891e72166ef63d1a09da26d');

alter policy "Admin token can delete portfolio projects"
  on public.portfolio_projects
  using (encode(extensions.digest(coalesce((select current_setting('request.headers', true)::jsonb ->> 'x-portfolio-write-token'), ''), 'sha256'), 'hex') = '6ed22b97a79d205ae4800f46023913013c93af72c891e72166ef63d1a09da26d');
