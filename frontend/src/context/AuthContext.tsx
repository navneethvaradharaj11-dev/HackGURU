'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, StudentProfile } from '@/lib/api';

interface AuthContextType {
  token: string | null;
  user: StudentProfile | null;
  loading: boolean;
  login: (token: string, studentData?: StudentProfile) => void;
  logout: () => void;
  updateUser: (data: Partial<StudentProfile>) => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('ace_auth_token');
    const savedUser = localStorage.getItem('ace_user_profile');

    if (savedToken) {
      setToken(savedToken);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          // ignore
        }
      }
      // Try to fetch current profile from API
      authApi
        .getMe()
        .then((res) => {
          if (res.data) {
            setUser(res.data);
            localStorage.setItem('ace_user_profile', JSON.stringify(res.data));
          }
        })
        .catch(() => {
          // Fallback demo user if backend is running in inmemory/mock mode
          if (!savedUser) {
            const demoUser: StudentProfile = {
              id: 'demo-student-1',
              email: 'aarav.sharma@iitb.ac.in',
              fullName: 'Aarav Sharma',
              collegeName: 'IIT Bombay',
              branch: 'Computer Science',
              yearOfStudy: 3,
              degree: 'B.Tech',
              location: 'Mumbai, India',
              careerGoal: 'AI Research Scientist & Full Stack Lead',
              bio: 'Exploring LLMs, Agentic AI, and distributed systems.',
            };
            setUser(demoUser);
            localStorage.setItem('ace_user_profile', JSON.stringify(demoUser));
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (newToken: string, studentData?: StudentProfile) => {
    localStorage.setItem('ace_auth_token', newToken);
    setToken(newToken);
    if (studentData) {
      setUser(studentData);
      localStorage.setItem('ace_user_profile', JSON.stringify(studentData));
    } else {
      // Default demo profile if login endpoint returned simple token
      const defaultUser: StudentProfile = {
        email: 'student@college.edu',
        fullName: 'Student User',
        collegeName: 'IIT Bombay',
        branch: 'Computer Science',
        yearOfStudy: 3,
        degree: 'B.Tech',
        careerGoal: 'Software Architect',
      };
      setUser(defaultUser);
      localStorage.setItem('ace_user_profile', JSON.stringify(defaultUser));
    }
  };

  const logout = () => {
    localStorage.removeItem('ace_auth_token');
    localStorage.removeItem('ace_user_profile');
    setToken(null);
    setUser(null);
  };

  const updateUser = (data: Partial<StudentProfile>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      localStorage.setItem('ace_user_profile', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
