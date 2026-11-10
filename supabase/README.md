# Useless Dyad property marketplace setup

The website UI and private admin dashboard are in the repository. Live listing management requires a Supabase project; a static website cannot safely provide private multi-device admin access or durable photo storage on its own.

## One-time setup

1. Create a Supabase project at https://supabase.com.
2. Open **SQL Editor**, paste all of `supabase/setup.sql`, and run it.
3. In **Authentication → Users**, create one user using your own email and a strong password. Disable public sign-ups in Authentication settings.
4. In SQL Editor, replace the email below with your exact admin email and run:

```sql
insert into public.admin_users (user_id)
select id from auth.users where email = 'YOUR-ADMIN-EMAIL@example.com'
on conflict (user_id) do nothing;
```

5. Open **Project Settings → API**. Copy the Project URL and the publishable key (or legacy anon key).
6. Put those two public values in `js/supabase-config.js`:

```js
window.UD_SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
window.UD_SUPABASE_ANON_KEY = "YOUR-PUBLISHABLE-OR-ANON-KEY";
window.UD_WHATSAPP_NUMBER = "919949313533";
```

7. Commit the config file. The publishable/anon key is safe to expose only because Row Level Security is enabled by the SQL above. **Never put a service_role or secret key in website JavaScript.**
8. Visit `/admin.html`, sign in with the admin email/password, and add or update listings.

## What is included

- Public Cars24-style property grid with search, property type, BHK and budget filters.
- Public visitors see only listings with status **Available**.
- Admin can create, edit, mark sold/reserved/draft, and delete listings.
- Multiple property photos upload to the public `property-images` bucket.
- WhatsApp enquiry links include the property title and listing ID.
- Existing three sample properties are seeded by the SQL setup script.

## Important security notes

- Admin writes are protected by database policies, not just by hiding the dashboard.
- Only users whose auth UUID is inserted into `public.admin_users` can manage listings.
- Keep public sign-ups disabled. Do not share the admin password.
- If a listing is sold, change its status to **Sold**; it disappears from the public Available inventory.
- Before going live, verify all listing prices, availability, photos, legal title, approvals, and seller authorisation. The three seeded records are the existing sample listings from the website and must be reconfirmed before publication.
