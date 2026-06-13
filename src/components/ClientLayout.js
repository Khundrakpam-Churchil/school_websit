'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import { useAuth } from '@/context/AuthContext';

export default function ClientLayout({ children }) {
  const { user, logout, message } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-schoolLight text-slate-900">
      <Navbar 
        user={user} 
        onLogin={() => setIsLoginOpen(true)} 
        onLogout={logout} 
      />
      {message && (
        <div className="bg-sky-50 border-b border-slate-200 py-3 text-center text-sm text-slate-700">
          {message}
        </div>
      )}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </div>
  );
}
