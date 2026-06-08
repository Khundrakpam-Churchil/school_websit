'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'Student') {
      setProfile(null);
      return;
    }
    setLoading(true);
    fetch(`/api/student/${user.profile.reg_no}/profile`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProfile(data.profile);
        } else {
          setError(data.message);
        }
      })
      .catch(() => setError('Unable to load profile'))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-slate-900">Student Dashboard</h2>
        <p className="mt-4 text-slate-600">Please login as a student to access your profile and exam status.</p>
      </div>
    );
  }

  if (user.role !== 'Student') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-slate-900">Access Restricted</h2>
        <p className="mt-4 text-slate-600">The dashboard is available only for students.</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-10 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Student Dashboard</h2>
            <p className="mt-3 text-slate-600">Quick access to your profile, exam registration, and fee status.</p>
          </div>
        </div>

        {loading ? (
          <p className="mt-8 text-slate-600 font-medium">Loading profile...</p>
        ) : error ? (
          <p className="mt-8 text-red-600 font-medium">{error}</p>
        ) : profile ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
              <h3 className="text-xl font-semibold text-slate-900">Profile</h3>
              <dl className="mt-6 space-y-5 text-slate-600">
                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-slate-500">Name</dt>
                  <dd className="mt-1 text-lg font-semibold text-slate-900">{profile.student_name}</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-slate-500">Registration Number</dt>
                  <dd className="mt-1 text-lg font-semibold text-slate-900">{profile.reg_no}</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-slate-500">Class</dt>
                  <dd className="mt-1 text-lg font-semibold text-slate-900">{profile.class_name}</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-slate-500">Roll Number</dt>
                  <dd className="mt-1 text-lg font-semibold text-slate-900">{profile.roll_number}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
              <h3 className="text-xl font-semibold text-slate-900">Exam & Fee Status</h3>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
                  <p className="text-sm text-slate-500">Examination Status</p>
                  <p className="mt-2 text-lg font-semibold text-schoolBlue">Registered</p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
                  <p className="text-sm text-slate-500">Fee Status</p>
                  <p className={`mt-2 text-lg font-semibold ${profile.fee_status === 'Paid' ? 'text-schoolGreen' : 'text-schoolOrange'}`}>{profile.fee_status}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
