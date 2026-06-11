"use client";
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ onLogin, onLogout, user }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Home', to: '/' },
    { label: 'Registration', to: '/registration' },
    { label: 'Academics', to: '/academics' },
    { label: 'Fee', to: '/fee' },
    { label: 'Hostel', to: '/hostel' },
    { label: 'About', to: '/about' },
    { label: 'Notice', to: '/notice' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Admin', to: '/admin' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
          <span className="inline-flex items-center gap-2">
            <span className="h-9 w-9 rounded-2xl bg-schoolBlue text-white grid place-items-center text-lg font-semibold">S</span>
            Springfield Portal
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center rounded-2xl border border-slate-200 bg-white p-2 text-slate-700 md:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle navigation"
        >
          <span className="text-2xl">{open ? '✕' : '☰'}</span>
        </button>

        <nav className="hidden md:flex flex-wrap items-center gap-4 text-sm text-slate-700">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-schoolBlue transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">{user.role} logged in</span>
              <button
                onClick={onLogout}
                className="rounded-full bg-schoolBlue px-4 py-2 text-white shadow-sm hover:bg-blue-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={onLogin}
              className="rounded-full bg-schoolBlue px-4 py-2 text-white shadow-sm hover:bg-blue-600"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pb-6">
          <div className="space-y-3 py-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {user ? (
              <button
                onClick={() => {
                  onLogout();
                  setOpen(false);
                }}
                className="rounded-full bg-schoolBlue px-4 py-3 text-white shadow-sm hover:bg-blue-600"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  onLogin();
                  setOpen(false);
                }}
                className="rounded-full bg-schoolBlue px-4 py-3 text-white shadow-sm hover:bg-blue-600"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
