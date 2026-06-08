'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const roles = ['Student', 'Faculty', 'Admin'];

export default function LoginModal() {
  const { role: defaultRole, setShowLogin, login, message, setMessage } = useAuth();
  const [loginType, setLoginType] = useState(defaultRole);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [robotChecked, setRobotChecked] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoginType(defaultRole);
    setError('');
  }, [defaultRole]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!robotChecked) {
      setError('Please confirm you are not a robot.');
      return;
    }

    if (loginType === 'Student' && !registrationNumber) {
      setError('Please enter your registration number.');
      return;
    }

    if (loginType !== 'Student' && !username) {
      setError('Please enter your username.');
      return;
    }

    setError('');
    await login({ loginType, registrationNumber, password, username });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4 py-8">
      <div className="w-full max-w-xl rounded-[2rem] bg-white p-8 shadow-soft">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Secure Login</h2>
            <p className="text-sm text-slate-500">Choose your role and sign in to access the portal.</p>
          </div>
          <button onClick={() => { setShowLogin(false); setMessage(''); }} className="text-slate-500 transition hover:text-slate-900 cursor-pointer">Close</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {roles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setLoginType(role)}
                className={`rounded-3xl border px-4 py-3 text-sm font-semibold transition cursor-pointer ${loginType === role ? 'border-schoolBlue bg-schoolBlue text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-schoolBlue hover:text-schoolBlue'}`}
              >
                {role}
              </button>
            ))}
          </div>

          {loginType === 'Student' ? (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Registration Number</label>
              <input
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-schoolBlue/20"
                placeholder="Enter registration number"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-schoolBlue/20"
                placeholder="Enter username"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-schoolBlue/20"
              placeholder="Enter password"
            />
          </div>

          <label className="inline-flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={robotChecked}
              onChange={(e) => setRobotChecked(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-schoolBlue focus:ring-schoolBlue/20"
            />
            I am not a robot
          </label>

          {(error || message) && (
            <p className="text-sm text-red-600">{error || message}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-schoolBlue px-5 py-3 text-white shadow-sm hover:bg-blue-600 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
