# Vercel Deployment Guide

Complete guide for deploying your Tourism Platform to Vercel with Firebase integration.

## Prerequisites

- [x] Firebase project created at [Firebase Console](https://console.firebase.google.com)
- [x] Firestore database enabled in your Firebase project
- [x] Firebase configuration copied from Firebase Console
- [ ] Vercel account created at [vercel.com](https://vercel.com)

## Step 1: Firebase Setup (If Not Already Done)

### Enable Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `tourism-platform-sp530`
3. Navigate to **Firestore Database** in the left sidebar
4. Click **Create database**
5. Choose **Start in production mode** (we'll configure rules later)
6. Select your preferred location (e.g., `us-central`)

### Configure Firestore Security Rules

1. In Firestore Database, go to the **Rules** tab
2. Replace with development-friendly rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blogs collection - read public, write admin only
    match /blogs/{blogId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Destinations collection - read public
    match /destinations/{destId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Bookings collection - write public, read admin only
    match /bookings/{bookingId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // Contacts collection - write public, read admin only
    match /contacts/{contactId} {
      allow create: if true;
      allow read, delete: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

### Get Firebase Configuration

1. Go to **Project Settings** (gear icon) → **General**
2. Scroll to **Your apps** section
3. If you haven't added a web app, click **Add app** → **Web**
4. Copy the `firebaseConfig` object values

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. **Push Your Code to GitHub**
   ```bash
   git add .
   git commit -m "Add Firebase integration and Vercel deployment setup"
   git push origin main
   ```

2. **Import Project to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click **Import Git Repository**
   - Select your tourism platform repository
   - Click **Import**

3. **Configure Build Settings**
   - Framework Preset: **Next.js**
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

4. **Add Environment Variables** (CRITICAL!)

   Click **Environment Variables** and add each of these:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `NEXT_PUBLIC_FIREBASE_API_KEY` | Your Firebase API Key | Production, Preview, Development |
   | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `tourism-platform-sp530.firebaseapp.com` | Production, Preview, Development |
   | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `tourism-platform-sp530` | Production, Preview, Development |
   | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `tourism-platform-sp530.firebasestorage.app` | Production, Preview, Development |
   | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Your Messaging Sender ID | Production, Preview, Development |
   | `NEXT_PUBLIC_FIREBASE_APP_ID` | Your App ID | Production, Preview, Development |

   > [!IMPORTANT]
   > Copy these values from your `.env.local` file or Firebase Console. Each variable MUST be set for all three environments (Production, Preview, Development).

5. **Deploy**
   - Click **Deploy**
   - Wait for build to complete (2-3 minutes)
   - 🎉 Your site is live!

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
4. **Add Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
   vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
   vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
   ```
   
5. **Redeploy with Environment Variables**
   ```bash
   vercel --prod
   ```

## Step 3: Verify Deployment

### 1. Check Application Loads

Visit your Vercel URL (e.g., `https://your-app.vercel.app`) and verify:

- [x] Home page loads without errors
- [x] Navigation works
- [x] Images display correctly
- [x] No console errors in browser DevTools

### 2. Test Firebase Connection

Open browser DevTools Console and check for:

```
✅ Firebase initialized successfully
```

If you see Firebase errors:
- Check Vercel environment variables are set correctly
- Verify all variables are set for **Production** environment
- Redeploy the project

### 3. Test Contact Form

1. Go to `/contact` page
2. Fill out the form
3. Submit
4. Should see success message: "Thank you for your message! We will get back to you soon."
5. Check Firebase Console → Firestore → `contacts` collection
6. Verify your submission is saved

### 4. Test Blog Management

1. Go to `/admin/login`
2. Login with credentials:
   - Email: `admin@tourism.com`
   - Password: `admin123`
3. Try creating a new blog post
4. Verify it appears on the `/blogs` page
5. Test editing and deleting blogs

### 5. Test Bookings

1. Go to `/packages` page
2. Click **Book Now** on any package
3. Fill out booking form
4. Submit
5. Check Firestore → `bookings` collection
6. Verify booking is saved

## Step 4: Common Issues and Solutions

### Issue: "Firebase configuration error: Missing environment variables"

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify all 6 Firebase variables are added
3. Ensure they're enabled for Production environment
4. Redeploy: Deployments → Three dots → Redeploy

### Issue: Contact form shows "Network error"

**Solution:**
1. Check Vercel Function logs: Dashboard → Your Project → Logs
2. Look for errors in `/api/contact` endpoint
3. Verify Firebase Firestore is enabled
4. Check Firestore security rules allow `create` on `contacts` collection

### Issue: "Failed to fetch blogs"

**Solution:**
1. Check if Firestore has the `blogs` collection
2. Run migration script to populate data:
   ```bash
   npm run migrate
   ```
3. Verify Firestore rules allow reading `blogs`

### Issue: Admin login redirects to blank page

**Solution:**
1. Check browser console for errors
2. Verify `/admin/dashboard` route exists
3. Clear browser cache and cookies
4. Try incognito/private browsing mode

### Issue: Images not loading

**Solution:**
1. Check `next.config.js` has correct image domains:
   ```javascript
   images: {
     domains: ['images.unsplash.com', 'your-domain.vercel.app'],
     unoptimized: true,
   }
   ```
2. For external images, add domains to the list
3. Redeploy after configuration changes

## Step 5: Populate Firestore with Sample Data

If your Firestore is empty, run the migration script locally:

```bash
# This will copy data from JSON files to Firestore
node scripts/migrate-to-firestore.js
```

Or manually add sample data via Firebase Console:

1. Go to Firestore Database
2. Click **Start collection**
3. Collection ID: `blogs`
4. Add documents with fields: `title`, `slug`, `excerpt`, `image`, `content`, `date`, `author`

## Step 6: Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

## Step 7: Monitoring and Maintenance

### View Deployment Logs

- Vercel Dashboard → Your Project → Logs
- Filter by: Functions, Build, Static

### Monitor Firebase Usage

- Firebase Console → Usage and billing
- Check Firestore reads/writes
- Free tier: 50K reads, 20K writes per day

### Update Environment Variables

If you need to update Firebase config:

1. Vercel Dashboard → Settings → Environment Variables
2. Edit the variable
3. Redeploy the project (required for changes to take effect)

## Next Steps

- [ ] Set up continuous deployment (auto-deploy on git push)
- [ ] Configure Firebase Authentication for admin users
- [ ] Add Firebase Cloud Storage for image uploads
- [ ] Set up Firebase Analytics
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Configure caching strategies
- [ ] Add monitoring with Vercel Analytics

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

---

**Need Help?** Check Vercel logs and Firebase Console for detailed error messages.
