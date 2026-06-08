'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import { useAuth } from '@/context/AuthContext';

export default function ClientLayout({ children }) {
  const { showLogin, message } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-schoolLight text-slate-900">
      <Navbar />
      {message && !showLogin && (
        <div className="bg-sky-50 border-b border-slate-200 py-3 text-center text-sm text-slate-700">
          {message}
        </div>
      )}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      {showLogin && <LoginModal />}
    </div>
  );
}
