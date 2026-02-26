# 🚀 Deploying NoticeMe to Vercel

This guide walks you through deploying your NoticeMe landing page with waitlist to Vercel in minutes.

## ⚡ Quick Deploy (5 minutes)

### Option 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/noticeme.git
   git push -u origin main
   ```

2. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"
   - Leave settings as default
   - Click "Deploy"

**Done!** Your site is live! 🎉

### Option 2: Deploy from Command Line

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts** and your site deploys instantly!

---

## 📋 What Vercel Handles

✅ **Automatic HTTPS** - SSL certificate included
✅ **Global CDN** - Fast worldwide delivery
✅ **Auto Scaling** - Handles traffic spikes
✅ **Environment Variables** - Secure secrets
✅ **Serverless Functions** - Your `/api` folder runs on Vercel Functions
✅ **Git Integration** - Deploy on every push to main branch

---

## 🌍 Your Deployed Site URL

After deployment, you'll get a URL like:
```
https://noticeme.vercel.app
```

Share this with your users!

---

## 🔧 Current Setup

Your project is now configured for Vercel with:

- **`vercel.json`** - Vercel configuration
- **`api/waitlist.js`** - Serverless function handling waitlist
- **`index.html`** - Static frontend (served globally)
- **`style.css`** - Static styles
- **`waitlist.json`** - Temporary data storage

---

## ⚠️ Important: Data Storage

### Current Setup (Development Only)
- Waitlist data saves to `waitlist.json`
- Perfect for MVP and testing
- **LIMITATION:** Data is temporary and resets when you redeploy

### For Production (When You Scale)
You have several options:

#### Option A: Vercel PostgreSQL (Easiest)
```bash
vercel env pull  # Pull latest environment
```
- Built-in PostgreSQL database
- Managed by Vercel
- Requires Vercel Pro ($20/month)

#### Option B: MongoDB Atlas (Free)
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Add to Vercel environment variables:
   ```
   MONGODB_URI=mongodb+srv://...
   ```

#### Option C: Supabase (Free + Open Source)
1. Sign up at https://supabase.com
2. Create a project
3. Add connection string to Vercel env vars

**For now:** Your JSON file works great for MVP. Migrate to database when you hit 1000+ signups.

---

## 🔐 Environment Variables

If you need API keys or secrets:

1. **In Vercel Dashboard:**
   - Go to Project Settings → Environment Variables
   - Add your keys

2. **Access in code:**
   ```javascript
   process.env.YOUR_KEY_NAME
   ```

Example:
```bash
SENDGRID_API_KEY=sg_xxxxx
DATABASE_URL=mongodb+srv://...
```

---

## 📊 Monitor Your Waitlist

### Option 1: Via Vercel Dashboard
- Go to Functions tab
- See `waitlist` function logs and usage

### Option 2: Via API
```bash
# View all signups
curl https://your-domain.vercel.app/api/waitlist

# View stats
curl "https://your-domain.vercel.app/api/waitlist?stats=true"
```

### Option 3: Download from GitHub
```bash
git clone your-repo
cat waitlist.json
```

---

## 🔄 Redeployment

Your site **automatically redeploys** when you:
- Push to `main` branch on GitHub
- Update `vercel.json` or env vars
- Push new code

Manual redeploy:
```bash
vercel --prod
```

---

## 📈 Next Steps

### Phase 1: MVP (Where You Are Now)
- ✅ Landing page deployed
- ✅ Waitlist collecting signups
- ✅ JSON file storage

### Phase 2: Get Feedback (Week 2-4)
- Add email confirmations
- Send welcome email
- Track open rates

### Phase 3: Scale (Month 2+)
- Migrate to PostgreSQL/MongoDB
- Add user authentication
- Track referrals

### Phase 4: Launch (Month 3+)
- Product goes live
- Email waiting list
- Grand opening campaign

---

## 🐛 Troubleshooting

### "502 Bad Gateway"
- Check Vercel Functions log for errors
- Verify package.json has all dependencies
- Restart deployment: `vercel --prod`

### "Waitlist data disappeared after deploy"
- **Expected!** JSON files don't persist on Vercel
- Switch to a database (PostgreSQL/MongoDB)
- Or keep JSON + download it before redeploying

### "Function timeout"
- Your function took too long
- Upgrade Vercel plan for longer timeouts
- Or optimize database queries

### "CORS errors"
- Already fixed in `/api/waitlist.js`
- Should work on any domain

---

## 💰 Pricing

| Feature | Cost |
|---------|------|
| Hosting | Free forever |
| Serverless Functions | Free (limited) |
| Database (PostgreSQL) | Paid ($) |
| Custom Domain | Free or $10/month |
| Pro Plan | $20/month (if needed) |

**Bottom line:** Free tier is perfect for launching!

---

## 🎯 Success Checklist

- [ ] Code pushed to GitHub
- [ ] Project imported to Vercel
- [ ] Site deployed (live URL working)
- [ ] Waitlist form submitting
- [ ] Can view `/api/waitlist` endpoint
- [ ] Shared URL with users
- [ ] Monitoring signups

---

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Community:** https://vercel.com/support
- **Status Page:** https://vercel.statuspage.io

---

## 🚀 You're Live!

Congratulations! Your NoticeMe landing page is deployed globally.

**Next:** Share with your network and watch the signups roll in! 🎉

---

*Last updated: Feb 25, 2026*
