-- Supabase Schema para Probusiness Logistic

-- 1. Habilitar extensión para UUIDs
create extension if not exists "uuid-ossp";

-- 2. Variables y Enums
create type user_role as enum ('admin', 'employee');
create type order_status as enum ('pending', 'accepted', 'rejected', 'in_transit', 'arrived', 'delivered');

-- 3. Tabla de Perfiles (Se vincula con auth.users de Supabase)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text not null,
  role user_role default 'employee' not null,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Tabla de Productos
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  available_qty integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Tabla de Listas de Precios
create table public.price_lists (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Items de Listas de Precios (Relación Productos <-> Listas)
create table public.price_list_items (
  id uuid default uuid_generate_v4() primary key,
  price_list_id uuid references public.price_lists(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  price numeric(10, 2) not null,
  unique(price_list_id, product_id)
);

-- 7. Tabla de Pedidos / Rutas
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  employee_id uuid references public.profiles(id),
  admin_id uuid references public.profiles(id),
  status order_status default 'pending' not null,
  customer_name text not null,
  address text not null,
  lat double precision,
  lng double precision,
  details text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Ubicación en tiempo real de Empleados
create table public.employee_locations (
  employee_id uuid references public.profiles(id) primary key,
  lat double precision not null,
  lng double precision not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ===== SEGURIDAD BÁSICA (RLS) =====
-- Para desarrollo, permitimos acceso abierto a usuarios autenticados.
-- En producción, ajusta estas políticas para que los empleados solo vean su info.

alter table public.profiles enable row level security;
create policy "Perfiles publicos para usuarios auth" on public.profiles for all to authenticated using (true) with check (true);

alter table public.products enable row level security;
create policy "Productos publicos para usuarios auth" on public.products for all to authenticated using (true) with check (true);

alter table public.price_lists enable row level security;
create policy "Listas publicas para usuarios auth" on public.price_lists for all to authenticated using (true) with check (true);

alter table public.price_list_items enable row level security;
create policy "Items publicos para usuarios auth" on public.price_list_items for all to authenticated using (true) with check (true);

alter table public.orders enable row level security;
create policy "Pedidos publicos para usuarios auth" on public.orders for all to authenticated using (true) with check (true);

alter table public.employee_locations enable row level security;
create policy "Ubicaciones publicas para usuarios auth" on public.employee_locations for all to authenticated using (true) with check (true);

-- Trigger para automatizar perfiles al crear usuario en Supabase Auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, role, full_name)
  values (new.id, new.email, 'employee', new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
