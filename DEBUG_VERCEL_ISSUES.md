# 🔍 DEBUG GUIDE: Vercel Production Issues

After redeploying with environment variables, if features still don't work, follow these steps:

## Step 1: Check Vercel Function Logs

1. Go to: https://vercel.com/shreyashpatil530-gmailcoms-projects/tourism-platform
2. Click **"Logs"** tab (top menu)
3. Set filter to: **"Functions"**
4. Look for recent errors in these API routes:
   - `/api/blogs` - Blog creation errors
   - `/api/bookings` - Booking errors
   - `/api/contact` - Contact form errors

### Common Error Messages to Look For:

**Error 1: "FirebaseError: Missing or insufficient permissions"**
- **Cause:** Firestore security rules are blocking writes
- **Fix:** Update Firestore security rules (see below)

**Error 2: "Firebase: Error (auth/...)"**
- **Cause:** Firebase Auth configuration issue
- **Fix:** Check Firebase Console settings

**Error 3: "Cannot read properties of undefined"**
- **Cause:** Environment variables not loaded
- **Fix:** Redeploy again without cache

---

## Step 2: Update Firestore Security Rules

Your Firestore may be blocking write operations. Update the rules:

### Go to Firebase Console:

1. Visit: https://console.firebase.google.com/project/tourism-platform-sp530/firestore/rules
2. Replace the rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Blogs collection - PUBLIC READ, anyone can write (for testing)
    match /blogs/{blogId} {
      allow read: if true;
      allow write: if true;  // TEMPORARY - open for testing
    }
    
    // Bookings collection - anyone can create/read
    match /bookings/{bookingId} {
      allow create: if true;
      allow read: if true;
      allow update, delete: if false;
    }
    
    // Contacts collection - anyone can create
    match /contacts/{contactId} {
      allow create: if true;
      allow read: if true;
      allow update, delete: if false;
    }
    
    // Destinations collection - read only
    match /destinations/{destId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

3. Click **"Publish"**

---

## Step 3: Check Firebase Console for Data

Go to: https://console.firebase.google.com/project/tourism-platform-sp530/firestore/data

**Check these collections exist:**
- `blogs` - Should have 5 documents
- `bookings` - Should have some documents
- `contacts` - Should have some documents
- `destinations` - Should have 6 documents

**If collections are missing:**
- They need to be created first
- Or run the migration script to populate data

---

## Step 4: Test in Browser Console

Open your production site: https://tourism-platform-phi.vercel.app/

1. Open Browser DevTools (F12)
2. Go to **Console** tab
3. Look for these messages:

**✅ Good Signs:**
```
✅ Firebase initialized successfully
```

**❌ Bad Signs:**
```
❌ Missing Firebase environment variables
FirebaseError: Missing or insufficient permissions
Failed to fetch
CORS error
```

---

## Step 5: Manual API Test

Test the API routes directly:

### Test Blogs API:
Open this in browser: https://tourism-platform-phi.vercel.app/api/blogs

**Expected:** JSON array with blog data
**If Error:** Check Vercel logs for `/api/blogs`

### Test Bookings API:
Cannot test POST via browser easily, but can check Vercel logs

---

## Step 6: Verify Environment Variables Loaded

Add this temporary check to your homepage:

1. Open browser console on: https://tourism-platform-phi.vercel.app/
2. Type this in console:

```javascript
console.log('API Key exists:', !!process?.env?.NEXT_PUBLIC_FIREBASE_API_KEY)
```

If it returns `false`, environment variables aren't loading.

---

## Step 7: Force Redeploy Without Cache

1. Go to Vercel Dashboard → Deployments
2. Find latest deployment
3. Click ⋮ → Redeploy
4. **UNCHECK** "Use existing Build Cache" ⬜
5. Click Redeploy
6. Wait for completion (2-3 minutes)

---

## Step 8: Check if Latest Code is Deployed

Verify your new API routes are deployed:

Visit: https://tourism-platform-phi.vercel.app/api/contact

**Expected Response:**
```json
{"error": "Method not allowed"}
```
OR a list of contacts if GET works

**If 404 Error:**
- The new API route wasn't deployed
- Commit and push your code to GitHub
- Redeploy from latest commit

---

## Quick Fix Checklist

- [ ] Firestore security rules updated to allow writes
- [ ] All 6 environment variables in Vercel
- [ ] "All Environments" checked for each variable
- [ ] Redeployed without build cache
- [ ] Checked Vercel Function logs for errors
- [ ] Verified Firebase Console has collections
- [ ] Browser console shows "Firebase initialized"
- [ ] Latest code pushed to GitHub

---

## If Still Not Working - Get Error Details

**I need these details to help:**

1. **Vercel Function Logs:**
   - Screenshot of errors in Logs → Functions

2. **Browser Console:**
   - Screenshot of console errors on production site

3. **Network Tab:**
   - F12 → Network tab
   - Try to create a blog
   - Find the `/api/blogs` request
   - Screenshot the response

4. **Firestore Rules:**
   - Screenshot of current Firestore security rules

---

## Most Likely Issues:

### Issue 1: Firestore Rules Too Restrictive ⭐ MOST COMMON
**Solution:** Update rules to allow writes (see Step 2)

### Issue 2: API Routes Not Deployed
**Solution:** 
```bash
git add .
git commit -m "Add contact API and fixes"
git push origin main
```
Then redeploy on Vercel

### Issue 3: Environment Variables Not Applied
**Solution:** Redeploy without cache (see Step 7)

---

## Next Steps

1. **First:** Update Firestore security rules (Step 2)
2. **Second:** Check Vercel Function logs (Step 1)
3. **Third:** Send me screenshot of the errors you see

The most common issue is Firestore security rules blocking writes. Update those first!
