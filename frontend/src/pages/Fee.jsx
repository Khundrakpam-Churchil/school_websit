import { useEffect, useState } from 'react';

export default function Fee({ user }) {
  const [feeStatus, setFeeStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'Student') return;
    fetch(`http://localhost:5000/api/student/${user.profile.reg_no}/fee`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFeeStatus(data.feeStatus);
        } else {
          setError(data.message);
        }
      })
      .catch(() => setError('Unable to load fee status'));
  }, [user]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-10 shadow-soft">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-start">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Fee Status</h2>
            <p className="mt-4 text-slate-600">Monitor your payment status so you can download your admit card without delay.</p>
            <div className="mt-8 space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-schoolBlue">Important reminder</p>
              <p className="text-slate-600">Ensure the fee record is paid in full to avoid issues with exam registration and admit card processing.</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Current Payment</h3>
            {user?.role !== 'Student' ? (
              <p className="mt-6 text-slate-600">Please login as a student to view your fee details.</p>
            ) : error ? (
              <p className="mt-6 text-red-600">{error}</p>
            ) : (
              <div className="mt-6 space-y-4">
                <p className="text-slate-700">Registration Number</p>
                <p className="rounded-3xl bg-white p-5 text-lg font-semibold text-slate-900">{user.profile.reg_no}</p>
                <div className="rounded-3xl bg-white p-5">
                  <p className="text-slate-700">Status</p>
                  <p className={`mt-3 text-2xl font-semibold ${feeStatus === 'Paid' ? 'text-schoolGreen' : 'text-schoolOrange'}`}>{feeStatus || 'Loading...'}</p>
                </div>
                <p className="text-sm text-slate-600">Contact the administration if your status does not update after payment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
