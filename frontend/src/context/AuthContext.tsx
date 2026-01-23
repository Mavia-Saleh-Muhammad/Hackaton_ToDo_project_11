'use client';

/**
 * Authentication Context for managing user auth state across the application.
 * Provides user info, login, logout, and signup functions.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, signup as authSignup, signin as authSignin, signout as authSignout, decodeToken, isTokenExpired } from '../lib/auth';
import { removeToken, setToken } from '../lib/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === 'undefined') return;

      const token = localStorage.getItem('auth_token');

      if (token) {
        // Check if token is expired
        if (isTokenExpired(token)) {
          // Token expired, clear it
          removeToken();
          setUser(null);
        } else {
          // Token valid, decode and set user
          const decodedUser = decodeToken(token);
          if (decodedUser) {
            setUser(decodedUser);
          } else {
            // Failed to decode, clear token
            removeToken();
            setUser(null);
          }
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  /**
   * Sign in with email and password
   */
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authSignin({ email, password });

      // Decode token to get user info
      const decodedUser = decodeToken(response.token);
      if (decodedUser) {
        setUser(decodedUser);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign up new user
   */
  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authSignup({ email, password });

      // Decode token to get user info
      const decodedUser = decodeToken(response.token);
      if (decodedUser) {
        setUser(decodedUser);
      }
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign out current user
   */
  const logout = () => {
    setUser(null);
    authSignout();
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use auth context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
