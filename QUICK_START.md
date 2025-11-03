# Quick Start Checklist

Follow these steps in order to get UniOne running:

## ✅ Pre-Flight Checklist

- [ ] Node.js installed (version 18 or higher)
- [ ] Internet connection active
- [ ] Code editor ready (VS Code recommended)
- [ ] Terminal/Command Prompt open

## 🚀 Setup Steps (15 minutes)

### Step 1: Install Dependencies (2 minutes)
```bash
npm install
```
**Wait for completion** - you'll see "added X packages"

### Step 2: Firebase Setup (10 minutes)

1. **Create Firebase Project**
   - Go to: https://console.firebase.google.com/
   - Click "Add project"
   - Name it "UniOne"
   - Follow the wizard (use default settings)

2. **Enable Authentication**
   - Left menu → Authentication → Get started
   - Click "Email/Password" → Enable → Save

3. **Create Firestore Database**
   - Left menu → Firestore Database → Create database
   - Start in **production mode** → Next → Enable

4. **Enable Storage**
   - Left menu → Storage → Get started
   - Use default settings → Done

5. **Get Configuration**
   - Settings (⚙️) → Project settings
   - Scroll to "Your apps" → Click web icon (</>)
   - Register app: "UniOne Web"
   - **Copy the config object**

6. **Add Config to Project**
   - Open: `src/firebase/config.ts`
   - Replace placeholder values with your Firebase config
   - **Save the file**

7. **Set Security Rules**
   - Firestore Database → Rules tab
   - Copy entire content from `firestore.rules` file
   - Paste into rules editor
   - Click "Publish"

### Step 3: Run the App (30 seconds)

```bash
npm run dev
```

Open browser: `http://localhost:3000`

### Step 4: Create Account (1 minute)

1. Click "Sign Up"
2. Fill all fields
3. Click "Create Account"
4. You're in! 🎉

---

## ❌ Troubleshooting

**"Firebase config not found"**
→ Check that you added your Firebase config to `src/firebase/config.ts`

**"Permission denied"**
→ Make sure you published Firestore security rules

**"Cannot find module"**
→ Run `npm install` again

**App won't start**
→ Check terminal for error messages
→ Make sure you're in the project folder

---

## 🎯 Next Steps

1. ✅ Test all pages
2. ✅ Upload a test PYQ
3. ✅ Create an announcement
4. ✅ Try the AI chatbot
5. ✅ Switch themes (dark/light)
6. ✅ Test on mobile (resize browser)

---

## 📚 Documentation

- **Detailed Setup**: See `SETUP_GUIDE.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Full Documentation**: See `README.md`
- **Project Overview**: See `PROJECT_SUMMARY.md`

---

**You're all set! Happy coding! 🚀**
