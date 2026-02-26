# 🚀 Quick Start Guide - NoticeMe Waitlist

## What's New

Your landing page now has a **fully functional waitlist form** that captures:
- User's name
- Email address
- School year/level
- Timestamp of signup

All submissions are stored securely in a JSON file.

## ⚡ Get Started in 3 Steps

### Step 1: Install Node.js (if you haven't already)
Download from: https://nodejs.org/ (choose the LTS version)

### Step 2: Install Dependencies
Open PowerShell in your project folder and run:
```powershell
npm install
```

This installs Express (web server) and other dependencies needed.

### Step 3: Start the Server
```powershell
npm start
```

You should see:
```
🚀 NoticeMe server running at http://localhost:3000
📝 Waitlist stored in: [path]/waitlist.json
```

### Step 4: Open in Browser
Visit: **http://localhost:3000**

## 📝 How the Waitlist Works

1. **User fills out the form** (name, email, school year)
2. **Form sends to your backend** (`/api/waitlist` endpoint)
3. **Data is validated** and saved to `waitlist.json`
4. **Success message appears** to confirm signup
5. **You can view all signups** anytime

## 📊 View Your Waitlist Data

While the server is running, you can:

### See all signups (in your browser):
```
http://localhost:3000/api/waitlist
```

### See statistics:
```
http://localhost:3000/api/waitlist/stats
```

### View the raw file:
Open `waitlist.json` in your text editor to see JSON data.

## 🎯 Key Features

✅ **Email Validation** - Prevents invalid emails
✅ **Duplicate Prevention** - Same email can't sign up twice
✅ **Timestamps** - Know when each person signed up
✅ **Position Tracking** - Users get their position in waitlist
✅ **Smooth UX** - Success message appears after signup
✅ **Mobile Responsive** - Works on all devices

## 💾 Data Backup

The `waitlist.json` file contains all your signups. You can:
- Download it for backup
- Import it to a database later
- Share it with your team
- Export as CSV if needed

## 🔧 Next Steps (Optional)

When ready to scale, you can:
1. **Add email verification** - Confirm users own the email
2. **Send confirmation emails** - Using Mailgun, SendGrid, etc.
3. **Connect a real database** - MongoDB, PostgreSQL, etc.
4. **Add authentication** - Protect admin endpoints
5. **Create an admin dashboard** - View/manage signups

See `README.md` for API documentation and advanced setup.

## ❓ Troubleshooting

**"npm: command not found"**
→ Make sure Node.js is installed: `node -v` in PowerShell

**"Port 3000 already in use"**
→ Change the port: Set `PORT=3001` before running, or kill the app using port 3000

**"CORS error"**
→ The backend handles this. If issues persist, check console for errors.

**"Waitlist doesn't save"**
→ Check that `waitlist.json` file exists in the folder (created automatically)

## 📧 Next: Sending Emails

Once you have signups, you'll probably want to send them a confirmation email. Check these services:
- **SendGrid** (free tier available)
- **Mailgun** (free tier available)
- **AWS SES** (very cheap)

We can add email integration when you're ready!

---

**Questions?** Check the server logs in PowerShell for error messages.

Happy launching! 🚀
