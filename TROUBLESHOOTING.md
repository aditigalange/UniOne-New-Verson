# Troubleshooting Guide - Website Not Displaying

## Common Issues and Solutions

### Issue 1: Blank/White Screen

**Symptoms:**
- Browser shows blank white screen
- No error messages visible
- Dev server is running

**Solutions:**

1. **Check Browser Console:**
   - Press `F12` or right-click → "Inspect"
   - Go to "Console" tab
   - Look for red error messages
   - Copy any error messages

2. **Check Terminal:**
   - Look at the terminal where you ran `npm run dev`
   - Check for compilation errors
   - Look for any red error text

3. **Common Causes:**
   - Firebase configuration error (most common)
   - Missing dependencies
   - Port already in use
   - Syntax errors in code

---

### Issue 2: Firebase Configuration Error

**Symptoms:**
- Console shows: `Firebase: Error (auth/api-key-not-valid...)`
- Blank screen or error page
- Network errors in console

**Solution:**

1. **Check Firebase Config:**
   - Open `src/firebase/config.ts`
   - Make sure ALL placeholder values are replaced
   - Values should NOT say "YOUR_API_KEY" or "YOUR_PROJECT_ID"

2. **Fix Config:**
   ```typescript
   // WRONG:
   apiKey: "YOUR_API_KEY"
   
   // CORRECT:
   apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
   ```

3. **Get Your Config:**
   - Go to https://console.firebase.google.com/
   - Project Settings → Your apps → Web app
   - Copy the actual config values

4. **Restart Server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

**See:** `FIX_FIREBASE_ERROR.md` for detailed instructions

---

### Issue 3: Port Already in Use

**Symptoms:**
- Terminal shows: "Port 3000 is already in use"
- Server won't start
- Website doesn't load

**Solution:**

1. **Option 1: Kill Process on Port 3000**
   ```bash
   # Windows:
   netstat -ano | findstr :3000
   taskkill /PID <PID_NUMBER> /F
   
   # Mac/Linux:
   lsof -ti:3000 | xargs kill -9
   ```

2. **Option 2: Use Different Port**
   - Edit `vite.config.ts`:
   ```typescript
   server: {
     port: 3001,  // Change to 3001 or any free port
   }
   ```

3. **Option 3: Find What's Using Port**
   ```bash
   # Windows:
   netstat -ano | findstr :3000
   
   # Mac/Linux:
   lsof -i :3000
   ```

---

### Issue 4: Missing Dependencies

**Symptoms:**
- Console shows: "Cannot find module..."
- Import errors
- Build fails

**Solution:**

1. **Delete and Reinstall:**
   ```bash
   # Delete node_modules and lock file
   rm -rf node_modules
   rm package-lock.json  # or yarn.lock
   
   # Reinstall
   npm install
   ```

2. **Check Node.js Version:**
   ```bash
   node --version
   # Should be 18 or higher
   ```

3. **Clear Cache:**
   ```bash
   npm cache clean --force
   npm install
   ```

---

### Issue 5: Compilation Errors

**Symptoms:**
- Terminal shows TypeScript/compilation errors
- Website won't load
- Red errors in terminal

**Solution:**

1. **Check for Syntax Errors:**
   - Look at the file mentioned in error
   - Check for missing brackets, quotes, etc.
   - Make sure all imports are correct

2. **Common Syntax Issues:**
   - Missing closing brackets `}`
   - Missing commas in objects
   - Incorrect import paths
   - TypeScript type errors

3. **Fix Step by Step:**
   - Read the error message carefully
   - It usually tells you the file and line number
   - Fix that specific issue
   - Save and check if more errors appear

---

### Issue 6: Browser Cache Issues

**Symptoms:**
- Website shows old version
- Changes don't appear
- Styling looks broken

**Solution:**

1. **Hard Refresh:**
   - Windows/Linux: `Ctrl + Shift + R` or `Ctrl + F5`
   - Mac: `Cmd + Shift + R`

2. **Clear Browser Cache:**
   - Chrome: Settings → Privacy → Clear browsing data
   - Firefox: Settings → Privacy → Clear Data
   - Edge: Settings → Privacy → Clear browsing data

3. **Use Incognito/Private Mode:**
   - Test in incognito window
   - This bypasses cache completely

---

### Issue 7: Dev Server Not Starting

**Symptoms:**
- Command `npm run dev` fails
- No server running
- Cannot access localhost

**Solution:**

1. **Check if Node.js is Installed:**
   ```bash
   node --version
   npm --version
   ```
   If these fail, install Node.js from nodejs.org

2. **Check if Dependencies are Installed:**
   ```bash
   ls node_modules
   # Should show many folders
   ```
   If empty, run: `npm install`

3. **Check for Permission Errors:**
   - Run terminal as administrator (Windows)
   - Check file permissions (Mac/Linux)

---

## Quick Diagnostic Steps

Follow these steps in order:

### Step 1: Check Terminal
```bash
# Is server running?
# You should see: "VITE v5.x.x ready in xxx ms"
# And: "Local: http://localhost:3000/"
```

### Step 2: Check Browser Console
1. Open browser (Chrome/Firefox/Edge)
2. Press `F12`
3. Go to "Console" tab
4. Look for red errors
5. Copy any error messages

### Step 3: Check Firebase Config
1. Open `src/firebase/config.ts`
2. Check if all values are replaced
3. Should NOT contain "YOUR_API_KEY" or similar

### Step 4: Try Basic Fix
```bash
# Stop server (Ctrl+C)
# Clear and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Step 5: Check Network Tab
1. Browser DevTools → Network tab
2. Refresh page
3. Look for failed requests (red)
4. Check what's failing

---

## Getting More Help

If none of these work:

1. **Copy Error Messages:**
   - From browser console (F12 → Console)
   - From terminal output
   - Take screenshots

2. **Check These Files:**
   - `src/firebase/config.ts` - Is Firebase configured?
   - `package.json` - Are dependencies correct?
   - Terminal output - What errors appear?

3. **Common Information Needed:**
   - Operating System (Windows/Mac/Linux)
   - Node.js version (`node --version`)
   - Browser being used
   - Exact error messages
   - What you see (blank screen, error page, etc.)

---

## Prevention Tips

1. **Always configure Firebase before running**
   - Don't run with placeholder values
   - Test config is valid

2. **Keep dependencies updated**
   ```bash
   npm install
   ```

3. **Check console regularly**
   - Open DevTools (F12) when developing
   - Fix errors immediately

4. **Use version control**
   - Commit working code
   - Easy to rollback if something breaks

---

## Still Not Working?

If you've tried everything:

1. **Start Fresh:**
   ```bash
   # Backup your Firebase config first!
   rm -rf node_modules
   npm install
   npm run dev
   ```

2. **Check Node.js Version:**
   - Should be 18 or higher
   - Update if needed from nodejs.org

3. **Try Different Browser:**
   - Sometimes browser-specific issues
   - Test in Chrome, Firefox, Edge

4. **Check Firewall/Antivirus:**
   - Might be blocking localhost
   - Temporarily disable to test

---

**Most Common Issue:** Firebase configuration not set up. Check `src/firebase/config.ts` first!

