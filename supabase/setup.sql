-- Useless Dyad property marketplace database and access policies
-- Run this entire file in Supabase SQL Editor after creating your Supabase project.
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

create or replace function private.is_property_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users au
    where au.user_id = (select auth.uid())
  );
$$;
revoke all on function private.is_property_admin() from public;
grant execute on function private.is_property_admin() to authenticated;

create table if not exists public.properties (
  id text primary key default ('UD-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))),
  title text not null,
  property_type text not null check (property_type in ('Independent House','Villa','Apartment','Plot')),
  price bigint not null check (price > 0),
  locality text not null,
  city text not null default 'Hyderabad',
  bedrooms integer,
  bathrooms integer,
  area_sq_yards numeric,
  floors integer,
  description text,
  video_url text,
  photos text[] not null default '{}',
  status text not null default 'draft' check (status in ('available','sold','reserved','draft')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.properties enable row level security;

grant select on public.properties to anon, authenticated;
grant insert, update, delete on public.properties to authenticated;
grant select on public.admin_users to authenticated;

drop policy if exists "Public can view available properties" on public.properties;
create policy "Public can view available properties" on public.properties
for select to anon using (status = 'available');

drop policy if exists "Signed-in users can view available properties" on public.properties;
create policy "Signed-in users can view available properties" on public.properties
for select to authenticated using (status = 'available');

drop policy if exists "Admins can view all properties" on public.properties;
create policy "Admins can view all properties" on public.properties
for select to authenticated using ((select private.is_property_admin()));

drop policy if exists "Admins can insert properties" on public.properties;
create policy "Admins can insert properties" on public.properties
for insert to authenticated with check ((select private.is_property_admin()));

drop policy if exists "Admins can update properties" on public.properties;
create policy "Admins can update properties" on public.properties
for update to authenticated using ((select private.is_property_admin()))
with check ((select private.is_property_admin()));

drop policy if exists "Admins can delete properties" on public.properties;
create policy "Admins can delete properties" on public.properties
for delete to authenticated using ((select private.is_property_admin()));

drop policy if exists "Admins can read admin list" on public.admin_users;
create policy "Admins can read admin list" on public.admin_users
for select to authenticated using ((select private.is_property_admin()));

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('property-images','property-images',true,8388608,array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set public=true,file_size_limit=8388608,
allowed_mime_types=array['image/jpeg','image/png','image/webp','image/avif'];

drop policy if exists "Public can view property photos" on storage.objects;
create policy "Public can view property photos" on storage.objects
for select to anon,authenticated using (bucket_id = 'property-images');

drop policy if exists "Admins can upload property photos" on storage.objects;
create policy "Admins can upload property photos" on storage.objects
for insert to authenticated with check (bucket_id = 'property-images' and (select private.is_property_admin()));

drop policy if exists "Admins can update property photos" on storage.objects;
create policy "Admins can update property photos" on storage.objects
for update to authenticated using (bucket_id = 'property-images' and (select private.is_property_admin()))
with check (bucket_id = 'property-images' and (select private.is_property_admin()));

drop policy if exists "Admins can delete property photos" on storage.objects;
create policy "Admins can delete property photos" on storage.objects
for delete to authenticated using (bucket_id = 'property-images' and (select private.is_property_admin()));

-- Remove the legacy helper if this script is run over an earlier setup.
drop function if exists public.is_property_admin();

-- Create your own admin login in Supabase Authentication > Users first.
-- Then replace the email below with the exact email used for that login and run:
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'YOUR-ADMIN-EMAIL@example.com'
-- on conflict (user_id) do nothing;

-- Existing website inventory, retained as initial live listings.
insert into public.properties (id,title,property_type,price,locality,city,area_sq_yards,floors,description,video_url,photos,status)
values
('UD-001','G+1 Independent House','Independent House',12000000,'Turkayamjal','Hyderabad',150,2,'New independent house near TCS Adibatla.','https://youtu.be/E79koeAgsaA',array['https://img.youtube.com/vi/E79koeAgsaA/hqdefault.jpg'],'available'),
('UD-002','2 BHK Independent House','Independent House',7400000,'Nadergul','Hyderabad',null,null,'Independent 2 BHK house in Nadergul.','https://youtu.be/K_PAbQWEpQM',array['https://img.youtube.com/vi/K_PAbQWEpQM/hqdefault.jpg'],'available'),
('UD-003','G+1 Independent House','Independent House',13900000,'Turkayamjal','Hyderabad',200,2,'New G+1 independent house near TCS Adibatla.','https://youtu.be/4cgiVLTqe0w',array['https://img.youtube.com/vi/4cgiVLTqe0w/hqdefault.jpg'],'available')
on conflict (id) do nothing;
