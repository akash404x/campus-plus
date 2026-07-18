'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange, getUserProfile, UserProfile, signInWithGoogle, signOutUser, resetPassword, sendOtp, verifyOtp, signUpWithEmail, signInWithEmail, UserRole } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: () => Promise<{ user: User | null; error: string | null }>;
  logout: () => Promise<{ error: string | null }>;
  signOut: () => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ user: User | null; error: string | null }>;
  signUpWithEmail: (email: string, password: string, role: UserRole, displayName?: string) => Promise<{ user: User | null; error: string | null }>;
  signInWithEmail: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  sendOtp: (phoneNumber: string, recaptchaVerifier: any) => Promise<{ confirmationResult: any; error: string | null }>;
  verifyOtp: (confirmationResult: any, otp: string, role: UserRole, displayName?: string) => Promise<{ user: User | null; error: string | null }>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setUser(user);
      if (user) {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshUserProfile = async () => {
    if (user) {
      const profile = await getUserProfile(user.uid);
      setUserProfile(profile);
    }
  };

  const login = async (): Promise<{ user: User | null; error: string | null }> => {
    return signInWithGoogle();
  };

  const logout = async (): Promise<{ error: string | null }> => {
    return signOutUser();
  };

  const handleSignInWithGoogle = async (): Promise<{ user: User | null; error: string | null }> => {
    return signInWithGoogle();
  };

  const handleSignUpWithEmail = async (email: string, password: string, role: UserRole, displayName?: string): Promise<{ user: User | null; error: string | null }> => {
    return signUpWithEmail(email, password, role, displayName);
  };

  const handleSignInWithEmail = async (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
    return signInWithEmail(email, password);
  };

  const handleResetPassword = async (email: string): Promise<{ error: string | null }> => {
    return resetPassword(email);
  };

  const handleSendOtp = async (phoneNumber: string, recaptchaVerifier: any): Promise<{ confirmationResult: any; error: string | null }> => {
    return sendOtp(phoneNumber, recaptchaVerifier);
  };

  const handleVerifyOtp = async (confirmationResult: any, otp: string, role: UserRole, displayName?: string): Promise<{ user: User | null; error: string | null }> => {
    return verifyOtp(confirmationResult, otp, role, displayName);
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    login,
    logout,
    signOut: logout,
    signInWithGoogle: handleSignInWithGoogle,
    signUpWithEmail: handleSignUpWithEmail,
    signInWithEmail: handleSignInWithEmail,
    resetPassword: handleResetPassword,
    sendOtp: handleSendOtp,
    verifyOtp: handleVerifyOtp,
    refreshUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
