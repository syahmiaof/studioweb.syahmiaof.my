-- Add is_hidden flag to support soft-delete and hiding projects from public showcase
alter table public.portfolio_projects
  add column if not exists is_hidden boolean not null default false;

create index if not exists portfolio_projects_hidden_idx
  on public.portfolio_projects (is_hidden, sort_order);
