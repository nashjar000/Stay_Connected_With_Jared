# Supabase Setup Guide for Video Journal Authentication

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign up"
3. Sign up with GitHub, Google, or email
4. Create a new organization (or use existing)

## Step 2: Create a New Project

1. Click "New Project"
2. Enter project details:
   - **Name**: stay-connected-with-jared (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
3. Click "Create new project"
4. Wait ~2 minutes for project to provision

## Step 3: Get Your Project Keys

1. In your project dashboard, click the **Settings** gear icon (bottom left)
2. Click **API** in the left sidebar
3. You'll see two important values:
   - **Project URL**: This is your `SUPABASE_URL`
   - **anon public key**: This is your `SUPABASE_ANON_KEY`
4. **COPY THESE VALUES** - you'll need them in Step 5

## Step 4: Create the Database Table

1. In your Supabase dashboard, click **SQL Editor** (in the left sidebar)
2. Click **New query**
3. **Copy and paste the entire SQL code below:**

```sql
-- Create approved_users table
CREATE TABLE approved_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    display_name TEXT,
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    approved_at TIMESTAMPTZ,
    CONSTRAINT unique_user_id UNIQUE (user_id)
);

-- Create index for faster lookups
CREATE INDEX idx_approved_users_user_id ON approved_users(user_id);
CREATE INDEX idx_approved_users_approved ON approved_users(approved);

-- Enable Row Level Security
ALTER TABLE approved_users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own approval status
CREATE POLICY "Users can view own approval status"
    ON approved_users
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Anyone can insert (when they sign up)
CREATE POLICY "Anyone can insert their approval request"
    ON approved_users
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy: Only authenticated users can view all (for admin dashboard)
-- Note: You should restrict this to only your admin email in production
CREATE POLICY "Authenticated users can view all approvals"
    ON approved_users
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Policy: Only authenticated users can update (for admin approval)
-- Note: You should restrict this to only your admin email in production
CREATE POLICY "Authenticated users can update approvals"
    ON approved_users
    FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Policy: Allow authenticated users to delete (for admin deny)
CREATE POLICY "Authenticated users can delete approval requests"
    ON approved_users
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- Create function to automatically create approval entry when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.approved_users (user_id, email, display_name, approved)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'display_name',
        FALSE
    )
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to run function on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
```

4. Click **Run** (or press Ctrl/Cmd + Enter)
5. You should see "Success. No rows returned" - this means it worked!

## Step 5: Update Your Website Configuration

1. Create a new file: `js/config.js`
2. Paste this configuration and replace the values:

```javascript
window.APP_CONFIG = {
    SUPABASE_URL: 'https://your-project-id.supabase.co',
    SUPABASE_ANON_KEY: 'your-anon-key-here'
};
```

## Step 6: Create Admins Table

Run this SQL in the Supabase SQL Editor:

```sql
create table if not exists public.admins (
    user_id uuid primary key references auth.users(id) on delete cascade,
    email text not null,
    created_at timestamptz default now()
);

alter table public.admins enable row level security;

create policy "Admins can read their row"
on public.admins for select
using (auth.uid() = user_id);

create policy "Service role can manage admins"
on public.admins for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
```

## Step 7: Add Your Admin User

Run this SQL after you have created your user account:

```sql
insert into public.admins (user_id, email)
select id, email
from auth.users
where email = 'your-admin-email@example.com';
```

## Step 7: Configure Email Settings (Optional but Recommended)

By default, Supabase sends confirmation emails. To customize:

1. Go to **Authentication** → **Email Templates** in Supabase
2. Customize the "Confirm signup" email template
3. You can also enable "Confirm email" requirement in **Authentication** → **Settings**

## Step 8: Enable Online Presence (Optional)

Run this SQL in the Supabase SQL Editor:

```sql
create table if not exists public.user_presence (
    user_id uuid primary key references auth.users(id) on delete cascade,
    email text,
    display_name text,
    last_seen timestamptz not null default now()
);

alter table public.user_presence enable row level security;

create policy "Users can insert presence"
on public.user_presence for insert
with check (auth.uid() = user_id);

create policy "Users can update presence"
on public.user_presence for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Admins can view presence"
on public.user_presence for select
using (
    exists (
        select 1 from public.admins
        where admins.user_id = auth.uid()
    )
);
```

## Step 9: Test Your Setup

1. Open your website locally or on a server
2. Navigate to `auth-signup.html`
3. Create a test account
4. Check if the user appears in:
   - Supabase Dashboard → **Authentication** → **Users**
   - Supabase Dashboard → **Table Editor** → **approved_users** table
5. Log in to `admin-dashboard.html` with your admin email
6. Approve the test user
7. Try accessing video journal pages

## Step 10: Deploy Your Website

For authentication to work properly, you'll need to host your site. Options:

### Option A: GitHub Pages (Free, Easy)
1. Create a GitHub repository
2. Push your code
3. Enable GitHub Pages in repository settings
4. Update Supabase Auth settings with your GitHub Pages URL

### Option B: Netlify (Free, Easy)
1. Create Netlify account
2. Drag and drop your project folder
3. Update Supabase Auth settings with your Netlify URL

### Option C: Vercel, Cloudflare Pages, etc.

After deployment:
1. Go to Supabase → **Authentication** → **URL Configuration**
2. Add your deployed site URL to "Site URL"
3. Add your deployed site URL to "Redirect URLs"

## Troubleshooting

### Users can't sign up
- Check if the `approved_users` table was created correctly
- Check browser console for errors
- Verify SUPABASE_URL and SUPABASE_ANON_KEY are correct

### Video journals not loading
- Open browser console (F12) to see errors
- Make sure the user is approved in the `approved_users` table
- Check that the auth protection script is loading

### Admin dashboard shows "Access denied"
- Make sure your user exists in the `admins` table
- Confirm you inserted the correct user into `admins`

### Email confirmations not sending
- Check Supabase → Authentication → Settings
- Make sure email confirmations are enabled
- Check spam folder

## Security Notes

### Important: Enhance Admin Security (Production)

The current admin check is client-side only. For production, you should:

1. Create an `admins` table in Supabase:
```sql
CREATE TABLE admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add your admin user
INSERT INTO admins (user_id, email) 
VALUES ('your-user-id', 'your-email@example.com');
```

2. Update RLS policies to check admin status:
```sql
-- Better policy: Only admins can update
CREATE POLICY "Only admins can update approvals"
    ON approved_users
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.user_id = auth.uid()
        )
    );
```

## Database Schema Reference

### Table: `approved_users`

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | References auth.users(id) |
| email | TEXT | User's email |
| display_name | TEXT | User's display name |
| approved | BOOLEAN | Approval status (default: false) |
| created_at | TIMESTAMPTZ | When user signed up |
| approved_at | TIMESTAMPTZ | When user was approved |

## Support

If you encounter issues:
1. Check Supabase documentation: https://supabase.com/docs
2. Check browser console for errors (F12)
3. Verify all SQL ran successfully in SQL Editor
4. Make sure your site is deployed (not just file://)

---

**That's it! Your video journal authentication system is ready! 🎉**
