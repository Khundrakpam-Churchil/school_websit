'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { students, admins, faculty } from '@/data/students';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback((regNumber, password, selectedRole) => {
    let foundUser = null;
    let userRole = null;

    if (selectedRole === 'student') {
      foundUser = students.find(s => s.reg_no === regNumber && s.password === password);
      if (foundUser) userRole = 'student';
    } else if (selectedRole === 'admin') {
      foundUser = admins.find(a => a.username === regNumber && a.password === password);
      if (foundUser) userRole = 'admin';
    } else if (selectedRole === 'faculty') {
      foundUser = faculty.find(f => f.username === regNumber && f.password === password);
      if (foundUser) userRole = 'faculty';
    }

    if (foundUser) {
      setUser(foundUser);
      setRole(userRole);
      setIsAuthenticated(true);
      return { success: true, user: foundUser, role: userRole };
    }

    return { success: false, error: 'Invalid credentials' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
  }, []);

  const canDownloadAdmitCard = useCallback(() => {
    if (role !== 'student' || !user) return false;
    return user.fee_status === 'Paid' && user.admit_card_status === 'approved';
  }, [user, role]);

  const getFeeStatus = useCallback(() => {
    if (role !== 'student' || !user) return null;
    return {
      status: user.fee_status,
      admit_card_status: user.admit_card_status,
      can_download: user.fee_status === 'Paid' && user.admit_card_status === 'approved'
    };
  }, [user, role]);

  const value = {
    user,
    role,
    isAuthenticated,
    login,
    logout,
    canDownloadAdmitCard,
    getFeeStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}