'use client';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [role, setRole] = useState('Student');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('user');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load user state from localStorage:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (payload) => {
    try {
      setMessage('');
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!data.success) {
        setMessage(data.message || 'Login failed');
        return false;
      }

      const userData = { role: data.role, profile: data.user, token: data.token };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Store token in cookie for middleware route protection
      document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Lax`;

      setShowLogin(false);
      setMessage('');
      
      if (data.role === 'Admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
      return true;
    } catch (error) {
      setMessage('Unable to connect to the server');
      return false;
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    
    // Clear token cookie
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';

    setMessage('You have been logged out');
    router.push('/');
  };

  const value = useMemo(() => ({
    user,
    setUser,
    showLogin,
    setShowLogin,
    role,
    setRole,
    message,
    setMessage,
    login: handleLogin,
    logout: handleLogout,
    loading
  }), [user, showLogin, role, message, loading]);

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
