# Vercel Deployment - Quick Steps

## 🚀 Fastest Way to Deploy

### Option 1: Vercel Dashboard (5 minutes)

1. **Sign Up**: Go to [vercel.com](https://vercel.com) → Sign up with GitHub

2. **Push to GitHub**:
```bash
cd d:/NEXTJS/ture
git init
git add .
git commit -m "Ready for deployment"
# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/tourism-platform.git
git push -u origin main
```

3. **Deploy on Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repo
   - Click **"Deploy"**
   - Done! Site live in 2-3 minutes

4. **Your Live URL**: `https://tourism-platform-xyz.vercel.app`

### Option 2: Vercel CLI (2 minutes)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Navigate to project
cd d:/NEXTJS/ture

# Deploy
vercel

# Production deploy
vercel --prod
```

## ✅ After Deployment

Test your live site:
- Home: `https://your-site.vercel.app`
- Destinations: `/destinations`
- Admin: `/admin/login` (admin@tourism.com / admin123)
- Booking: Try submitting a booking form

## 🔄 Update Your Site

With GitHub integration, just push:
```bash
git add .
git commit -m "Updates"
git push
```
Vercel auto-deploys in 2-3 minutes!

**See DEPLOYMENT.md for full guide**
