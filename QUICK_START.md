# Video Journal Authentication System - Quick Start

## ✅ What Was Created

### New Files:
1. **`js/supabaseClient.js`** - Supabase configuration and auth helper functions
2. **`js/videoJournalAuth.js`** - Auth protection script for video journal pages
3. **`auth-login.html`** - User login page
4. **`auth-signup.html`** - User signup page
5. **`auth-pending.html`** - Pending approval page
6. **`admin-dashboard.html`** - Admin dashboard to approve/deny users
7. **`styles/auth.css`** - Styling for all auth pages
8. **`SUPABASE_SETUP.md`** - Complete setup guide with SQL code

### Modified Files:
- All 10 video journal year pages (2017-2026) - Added auth protection
- `pages/video-journals.html` - Added auth checking and login prompts
- `styles/video.css` - Added auth message styling

## 🚀 Quick Setup Steps

### 1. Create Supabase Project (5 minutes)
1. Go to https://supabase.com and create an account
2. Create a new project
3. Copy your **Project URL** and **anon public key** from Settings → API

### 2. Run SQL Setup (2 minutes)
1. In Supabase, go to **SQL Editor**
2. Open `SUPABASE_SETUP.md` file
3. Copy the entire SQL code from **Step 4**
4. Paste and run it in the SQL Editor

### 3. Configure Your Site (2 minutes)
1. Create a new file: `js/config.js`
2. Paste this configuration:
   ```javascript
   window.APP_CONFIG = {
     SUPABASE_URL: 'YOUR_SUPABASE_URL_HERE',
     SUPABASE_ANON_KEY: 'YOUR_SUPABASE_ANON_KEY_HERE'
   };
   ```
3. Replace the values with your actual Supabase credentials from Step 1

### 4. Test It Out
1. Open `auth-signup.html` in your browser
2. Create a test account
3. Add your user to the `admins` table in Supabase
4. Open `admin-dashboard.html` and log in
5. Approve the test user
5. Try accessing a video journal page!

## 📁 File Structure
```
Your Site/
├── auth-login.html           (Login page)
├── auth-signup.html          (Signup page)
├── auth-pending.html         (Pending approval page)
├── admin-dashboard.html      (Admin dashboard)
├── js/
│   ├── supabaseClient.js     (Supabase config)
│   └── videoJournalAuth.js   (Protection script)
├── styles/
│   └── auth.css              (Auth page styling)
└── pages/
    ├── video-journals.html   (Shows/hides links based on auth)
    └── video-journal-YYYY.html (All protected)
```

## 🔒 How It Works

1. **Unauthenticated users** visiting video-journals.html see a login prompt
2. **Users can sign up** - they're added to database as "pending"
3. **You (admin) approve users** via the admin dashboard
4. **Approved users** can access all video journal pages
5. **Unapproved/logged out users** are redirected to login/pending pages

## 🌐 Deployment Required

Authentication requires your site to be hosted (not just file://). Options:
- **GitHub Pages** (free, easy)
- **Netlify** (free, easy)
- **Vercel** (free)
- Any web hosting service

After deployment, update your site URL in:
- Supabase → Authentication → URL Configuration

## 📖 Full Documentation

See `SUPABASE_SETUP.md` for:
- Complete SQL code
- Detailed step-by-step instructions
- Troubleshooting guide
- Security enhancements for production

## 🎯 Admin Dashboard Access

1. Navigate to `admin-dashboard.html`
2. Log in with your admin email (set in Step 3 above)
3. Approve/deny pending users
4. Revoke access if needed

## 🆘 Troubleshooting

**Can't log in?**
- Check that you copied the Supabase URL and key correctly
- Check browser console (F12) for errors

**Video journals not loading?**
- Make sure user is approved in admin dashboard
- Check that auth scripts are loading (F12 → Network tab)

**Admin dashboard says "Access denied"?**
- Verify your ADMIN_EMAIL matches exactly (case-sensitive)
- Make sure you're logged in with that email

## ✨ Features Included

✅ User signup/login
✅ Email verification (optional in Supabase settings)
✅ Approval system
✅ Protected video journal pages
✅ Admin dashboard
✅ Pending approval page
✅ Automatic redirects
✅ Mobile-responsive design
✅ Theme-compatible styling

---

**Ready to go! Follow the 3 configuration steps above and you're all set! 🎉**
