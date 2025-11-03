# UniOne - Academic Platform for University Students

A modern, mobile-responsive academic platform built with React, TypeScript, and Firebase. UniOne provides students with access to previous year questions (PYQs), smart notes, announcements, and an AI-powered study assistant.

## 🚀 Features

- **User Authentication** - Secure email/password login with Firebase
- **Previous Year Questions (PYQs)** - Upload, search, and download past exam papers
- **Smart Notes** - Interactive notes viewer with FlipHTML5 integration
- **Announcements** - Real-time announcements with notification system
- **Profile Management** - Editable profile with digital student ID generation
- **AI Chatbot** - Study assistant for PYQs and Notes sections
- **Dark/Light Theme** - Persistent theme toggle with beautiful brown/golden design
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: React Context API
- **Notifications**: React Hot Toast

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Firebase account** - [Create free account](https://firebase.google.com/)
- A code editor (VS Code recommended)

## 🔧 Setup Instructions

### Step 1: Clone or Download the Project

If you have the project files, navigate to the project folder in your terminal:

```bash
cd new_UniOne
```

### Step 2: Install Dependencies

Install all required packages:

```bash
npm install
```

This will install all the necessary packages. Wait for it to complete (this may take 2-3 minutes).

### Step 3: Set Up Firebase

1. **Create a Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" or select an existing project
   - Follow the setup wizard

2. **Enable Firebase Services:**
   - Go to **Authentication** → Enable **Email/Password** sign-in method
   - Go to **Firestore Database** → Create database → Start in **production mode** (we'll add rules later)
   - Go to **Storage** → Get started → Use default settings

3. **Get Your Firebase Configuration:**
   - Go to Project Settings (gear icon) → General tab
   - Scroll down to "Your apps" → Click the web icon (</>)
   - Register your app with a nickname (e.g., "UniOne Web")
   - Copy the `firebaseConfig` object

4. **Add Firebase Config to Your Project:**
   - Open `src/firebase/config.ts`
   - Replace the placeholder values with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Step 4: Set Up Firestore Security Rules

1. In Firebase Console, go to **Firestore Database** → **Rules** tab
2. Replace the default rules with the content from `firestore.rules` file
3. Click **Publish**

### Step 5: Run the Development Server

Start the development server:

```bash
npm run dev
```

The application will open automatically in your browser at `http://localhost:3000`

If it doesn't open automatically, manually navigate to `http://localhost:3000` in your browser.

### Step 6: Create Your First Account

1. Click on **Sign Up** on the login page
2. Fill in all the required fields:
   - Email address
   - Password (at least 6 characters)
   - Full Name
   - Department
   - Year
   - Student ID
3. Click **Create Account**
4. You'll be automatically logged in and redirected to the Home page

## 📱 Usage Guide

### Home Page
- View quick stats and recent activity
- Access quick actions to navigate to different sections

### PYQs Page
- **Search**: Use the search bar to find specific PYQs by title, subject, or year
- **Upload**: Fill out the form and upload a PDF file
- **Download**: Click the download button on any PYQ card
- **AI Assistant**: Click "AI Assistant" to get help with PYQs

### Smart Notes Page
- View interactive notes in the embedded viewer
- Navigate through pages using the controls
- Use AI Assistant for concept explanations

### Announcements Page
- View all announcements sorted by date
- Create new announcements (if you're logged in)
- See priority indicators (High/Medium/Low)
- New announcements are highlighted

### Profile Page
- Edit your profile information
- Download your digital student ID
- View all your account details

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [Vercel](https://vercel.com/)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the settings
   - Click "Deploy"

3. **Update Firebase Configuration:**
   - In Vercel project settings, add your Firebase config as environment variables (if needed)
   - Your app should be live!

### Deploy to Firebase Hosting

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```

3. **Build your project:**
   ```bash
   npm run build
   ```

4. **Initialize Firebase Hosting:**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set public directory as `dist`
   - Configure as single-page app: **Yes**
   - Don't overwrite index.html: **No**

5. **Deploy:**
   ```bash
   firebase deploy --only hosting
   ```

Your app will be live at `https://your-project-id.web.app`

## 🔒 Security Notes

- All user data is protected by Firestore security rules
- Only authenticated users can access the platform
- Users can only edit/delete their own content
- HTTPS is enforced by Firebase hosting

## 🎨 Customization

### Changing Theme Colors

Edit `tailwind.config.js` to modify the color scheme:

```javascript
colors: {
  primary: {
    dark: '#YOUR_COLOR',  // Dark theme primary
    light: '#YOUR_COLOR', // Light theme primary
  },
  // ... other colors
}
```

### Adding AI Integration

The current chatbot uses simulated responses. To integrate with OpenAI:

1. Get an API key from [OpenAI](https://platform.openai.com/)
2. Update `src/components/AIChatbot.tsx` with actual API calls
3. Add your API key as an environment variable (never commit it!)

## 📝 Project Structure

```
new_UniOne/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Layout.tsx
│   │   └── AIChatbot.tsx
│   ├── contexts/          # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── firebase/          # Firebase configuration
│   │   └── config.ts
│   ├── pages/             # Page components
│   │   ├── Home.tsx
│   │   ├── PYQs.tsx
│   │   ├── SmartNotes.tsx
│   │   ├── Announcements.tsx
│   │   ├── Profile.tsx
│   │   └── Login.tsx
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── firestore.rules        # Firestore security rules
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🐛 Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/configuration-not-found)"**
   - Make sure you've added your Firebase config to `src/firebase/config.ts`

2. **"Permission denied" errors**
   - Check that Firestore security rules are deployed correctly
   - Verify you're logged in

3. **Build errors**
   - Delete `node_modules` folder and `package-lock.json`
   - Run `npm install` again

4. **Styles not loading**
   - Make sure Tailwind CSS is properly configured
   - Check that `src/index.css` is imported in `main.tsx`

## 🔮 Future Enhancements

- **Real AI Integration**: Connect to OpenAI or Anthropic for actual AI responses
- **Mobile App**: Convert to React Native for iOS/Android
- **Advanced Search**: Full-text search with filters
- **Discussion Forum**: Student discussion threads
- **File Sharing**: Direct student-to-student file sharing
- **Analytics Dashboard**: Track study progress and performance
- **Calendar Integration**: Exam schedules and deadlines

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Firebase documentation: [https://firebase.google.com/docs](https://firebase.google.com/docs)
3. Check React documentation: [https://react.dev](https://react.dev)

## 📄 License

This project is ready for commercial use. Modify as needed for your institution.

## ✨ Credits

Built with:
- React
- Firebase
- Tailwind CSS
- TypeScript
- Vite

---

**Made with ❤️ for university students**

Happy studying! 🎓
#   U n i O n e - N e w - V e r s o n  
 