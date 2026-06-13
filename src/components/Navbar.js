"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ onLogin, onLogout, user }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Exams', href: '/exams' },
    { label: 'Fees', href: '/fees' },
    { label: 'Hostel', href: '/hostel' },
    { label: 'About', href: '/about' },
    { label: 'Notices', href: '/notices' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Admin', href: '/admin' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
          <span className="inline-flex items-center gap-2">
            <span className="h-9 w-9 rounded-2xl bg-schoolBlue text-white grid place-items-center text-lg font-semibold">S</span>
            SORA Maheikol
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
            <Link key={link.href} href={link.href} className="hover:text-schoolBlue transition-colors">
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
                className="rounded-full bg-slate-800 px-4 py-2 text-white shadow-sm hover:bg-slate-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={onLogin}
              className="rounded-full bg-black px-6 py-2 text-white shadow-sm hover:bg-slate-800 transition-colors"
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
                key={link.href}
                href={link.href}
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
                className="rounded-full bg-slate-800 px-4 py-3 text-white shadow-sm hover:bg-slate-700 transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  onLogin();
                  setOpen(false);
                }}
                className="rounded-full bg-black px-4 py-3 text-white shadow-sm hover:bg-slate-800 transition-colors"
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
