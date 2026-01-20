# ✅ Quick Test Checklist - Vercel Production

After adding environment variables and redeploying, test these features:

## Test 1: Contact Form ✉️

**Page:** https://tourism-platform-phi.vercel.app/contact (Already Open!)

1. Fill out the form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Subject: `Testing Vercel Fix`
   - Message: `Verifying Firebase works on production`

2. Click **"Send Message"**

3. **Expected Result:**
   - ✅ Button shows "Sending..." with spinner
   - ✅ Green success message appears: "Thank you for your message! We will get back to you soon."
   - ✅ Form fields clear automatically

4. **Verify in Firebase:**
   - Go to https://console.firebase.google.com/project/tourism-platform-sp530/firestore/data
   - Open `contacts` collection
   - Your test submission should be there!

---

## Test 2: Blog Page 📚

**Page:** https://tourism-platform-phi.vercel.app/blogs

1. Visit the blogs page
2. **Expected Result:**
   - ✅ Shows 5 blogs (or whatever you have in Firestore)
   - ✅ NOT "No blogs found"

---

## Test 3: Blog Creation (Admin) ✍️

**Page:** https://tourism-platform-phi.vercel.app/admin/login

1. Login with:
   - Email: `admin@tourism.com`
   - Password: `admin123`

2. Click **"New Blog"** button

3. Fill out the form:
   - Title: `Test Blog After Fix`
   - Slug: `test-blog-after-fix`
   - Image URL: `https://images.unsplash.com/photo-1506744038136-46273834b3fb`
   - Excerpt: `This is a test blog to verify Vercel deployment`
   - Content: `Testing Firebase Firestore integration on Vercel production environment.`

4. Click **"Create Blog"**

5. **Expected Result:**
   - ✅ Success message appears
   - ✅ New blog appears in the list
   - ✅ Can see it on https://tourism-platform-phi.vercel.app/blogs

---

## Test 4: Booking Submission 🎫

**Page:** https://tourism-platform-phi.vercel.app/packages

1. Click **"Book Now"** on any package

2. Fill out the booking form:
   - Name: `Test Booking`
   - Email: `booking@test.com`
   - Phone: `1234567890`
   - Guests: `2`
   - Date: (select any future date)
   - Message: `Test booking submission`

3. Submit the form

4. **Expected Result:**
   - ✅ Success message appears
   - ✅ Booking saved to Firestore `bookings` collection

---

## Troubleshooting

### If Contact Form Still Doesn't Work:

1. **Open Browser Console** (F12)
2. Submit the form
3. Look for errors like:
   - `❌ Missing Firebase environment variables` → Redeploy without cache
   - `Failed to fetch` → Check Vercel function logs
   - `CORS error` → Check Firebase authorized domains

### If Still Issues:

1. **Check Vercel Logs:**
   - Dashboard → Your Project → Logs
   - Filter by: Functions
   - Look for `/api/contact` errors

2. **Verify Environment Variables:**
   - Dashboard → Settings → Environment Variables
   - Make sure "Production" is checked ✅
   - All 6 variables present

3. **Redeploy Without Cache:**
   - Deployments → Latest → ⋮ → Redeploy
   - Uncheck "Use existing Build Cache"

---

## Success Indicators 🎉

You'll know it's working when:

✅ Contact form shows green success message  
✅ Blogs page displays all blog posts  
✅ Admin can create new blogs  
✅ Bookings save successfully  
✅ Data appears in Firebase Console → Firestore  

---

## Quick Console Check

Open browser console (F12) and you should see:

```
✅ Firebase initialized successfully
```

If you see errors about missing environment variables, that means the redeploy didn't pick up the variables yet. Wait a minute and hard refresh (Ctrl + Shift + R).
