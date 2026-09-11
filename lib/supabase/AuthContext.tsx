'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('echo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo login - in production, verify against Supabase
    const demoUsers: User[] = [
      { id: 'user-jija-001', email: 'jija@example.com', username: 'jijahmed', full_name: 'Jija Ahmed', avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80', bio: 'Full-Stack Developer & UI Creator' },
      { id: 'user-sarah-002', email: 'sarah@example.com', username: 'sarahahmed', full_name: 'Sarah Ahmed', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', bio: 'Photographer & Outdoor Explorer' },
    ];
    
    const found = demoUsers.find(u => u.email === email);
    if (found && password === 'password123') {
      setUser(found);
      localStorage.setItem('echo_user', JSON.stringify(found));
      return true;
    }
    return false;
  };

  const loginWithGoogle = () => {
    // Demo Google login
    const googleUser: User = { id: 'user-google-001', email: 'user@gmail.com', username: 'googleuser', full_name: 'Google User', avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80', bio: 'Signed in with Google' };
    setUser(googleUser);
    localStorage.setItem('echo_user', JSON.stringify(googleUser));
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Demo signup
    const newUser: User = { id: `user-${Date.now()}`, email, username: name.toLowerCase().replace(/\s/g, '_'), full_name: name, avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80', bio: 'New Echo member' };
    setUser(newUser);
    localStorage.setItem('echo_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('echo_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithGoogle, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
