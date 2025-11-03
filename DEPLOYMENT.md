# Deployment Guide

This guide explains how to deploy UniOne to production.

## Option 1: Deploy to Vercel (Easiest - Recommended)

Vercel is free and automatically deploys your app with zero configuration.

### Steps:

1. **Push your code to GitHub:**
   - Create a new repository on GitHub
   - In your project folder, open terminal and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com/
   - Sign up/login (free with GitHub)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects everything
   - Click "Deploy"
   - Wait 2-3 minutes

3. **Update Environment Variables (if needed):**
   - In Vercel project settings → Environment Variables
   - Add any Firebase config as env vars if you want (optional)

4. **Your app is live!**
   - You'll get a URL like: `https://your-project.vercel.app`
   - Share this URL with students

### Advantages:
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Automatic deployments on git push
- ✅ Global CDN (fast worldwide)
- ✅ Zero configuration needed

---

## Option 2: Deploy to Firebase Hosting

Firebase Hosting is also free and integrates perfectly with your Firebase backend.

### Steps:

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```
   - This opens your browser
   - Click "Allow" to authorize

3. **Build your project:**
   ```bash
   npm run build
   ```
   - This creates a `dist` folder with optimized files

4. **Initialize Firebase Hosting:**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project (the one you created earlier)
   - Public directory: `dist`
   - Configure as single-page app: **Yes**
   - Set up automatic builds: **No** (for now)
   - Overwrite index.html: **Yes**

5. **Deploy:**
   ```bash
   firebase deploy --only hosting
   ```

6. **Your app is live!**
   - URL: `https://YOUR_PROJECT_ID.web.app`
   - Also available at: `https://YOUR_PROJECT_ID.firebaseapp.com`

### Advantages:
- ✅ Free hosting
- ✅ Integrates with your Firebase backend
- ✅ Fast CDN
- ✅ Easy to update

---

## Option 3: Deploy to Netlify

Another excellent free hosting option.

### Steps:

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Go to Netlify:**
   - Visit https://www.netlify.com/
   - Sign up (free)

3. **Deploy:**
   - Drag and drop the `dist` folder to Netlify
   - OR connect to GitHub for automatic deployments

4. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `dist`

---

## Important Notes for Production

### 1. Environment Variables
Never commit your Firebase API keys directly if you're using env vars. Use Vercel/Netlify environment variables instead.

### 2. Firebase Security Rules
Make sure you've deployed your Firestore rules before going live:
- Go to Firebase Console → Firestore → Rules
- Ensure production rules are active

### 3. Custom Domain (Optional)
All hosting providers allow you to add a custom domain:
- Vercel: Project Settings → Domains
- Firebase: Hosting → Add custom domain
- Netlify: Site Settings → Domain Management

### 4. Performance
- The build is already optimized by Vite
- Images and assets are compressed
- Code is minified automatically

### 5. Updates
After deploying, whenever you make changes:
- **Vercel/Netlify**: Just push to GitHub (auto-deploys)
- **Firebase**: Run `npm run build` then `firebase deploy --only hosting`

---

## Cost Estimates

All options are **FREE** for:
- Up to 100GB bandwidth/month
- Unlimited projects
- Custom domains included

Perfect for university use!

---

## Need Help?

If deployment fails:
1. Check that you've built the project (`npm run build`)
2. Verify Firebase config is correct
3. Check browser console for errors
4. Review hosting provider logs

---

**Recommendation:** Use Vercel for the easiest experience. It's the simplest for beginners!
