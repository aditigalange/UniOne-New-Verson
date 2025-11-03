import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import toast from 'react-hot-toast';

interface UserProfile {
  email: string;
  name: string;
  department: string;
  year: string;
  studentId: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, department: string, year: string, studentId: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  firebaseConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const firebaseConfigured = auth !== null && db !== null;

  useEffect(() => {
    if (!firebaseConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth!, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserProfile(currentUser.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firebaseConfigured]);

  const fetchUserProfile = async (uid: string) => {
    if (!db) return;
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data() as UserProfile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    if (!auth) {
      toast.error('Firebase not configured. Please set up Firebase first.');
      throw new Error('Firebase not configured');
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const signup = async (
    email: string, 
    password: string, 
    name: string, 
    department: string, 
    year: string, 
    studentId: string
  ) => {
    if (!auth || !db) {
      toast.error('Firebase not configured. Please set up Firebase first.');
      throw new Error('Firebase not configured');
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const profile: UserProfile = {
        email,
        name,
        department,
        year,
        studentId,
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'users', userCredential.user.uid), profile);
      toast.success('Account created successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Signup failed');
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Logout failed');
      throw error;
    }
  };

  const updateProfile = async (profile: Partial<UserProfile>) => {
    if (!user || !db) return;
    try {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, { ...userProfile, ...profile }, { merge: true });
      setUserProfile({ ...userProfile!, ...profile });
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Update failed');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, login, signup, logout, updateProfile, firebaseConfigured }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};