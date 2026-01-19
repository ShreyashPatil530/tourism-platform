# Git Push Commands - Copy & Paste These

## Run these commands in your terminal one by one:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Add all files
git add .

# 3. Commit with message
git commit -m "Complete tourism platform with booking system and admin panel"

# 4. Set main branch
git branch -M main

# 5. Add your GitHub repository
git remote add origin https://github.com/ShreyashPatil530/tourism-platform.git

# 6. Push to GitHub
git push -u origin main
```

## If you get an error "remote origin already exists":
```bash
# Remove existing remote
git remote remove origin

# Add it again
git remote add origin https://github.com/ShreyashPatil530/tourism-platform.git

# Push
git push -u origin main
```

## After successful push:
✅ Your code will be on GitHub
✅ Ready to deploy on Vercel
✅ Go to vercel.com and import your repository!
