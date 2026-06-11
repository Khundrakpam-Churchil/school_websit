import { useEffect, useState } from 'react';

export default function Academics({ user }) {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'Student') return;
    setLoading(true);
    fetch(`http://localhost:5000/api/student/${user.profile.reg_no}/fee`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus(data.feeStatus);
        }
      })
      .catch(() => setMessage('Unable to load fee status'))
      .finally(() => setLoading(false));
  }, [user]);

  const downloadAdmitCard = async () => {
    if (!user || user.role !== 'Student') return;
    try {
      const response = await fetch(`http://localhost:5000/api/student/${user.profile.reg_no}/admit-card`);
      if (!response.ok) {
        const data = await response.json();
        setMessage(data.message || 'Unable to download admit card');
        return;
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `AdmitCard_${user.profile.reg_no}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
      setMessage('Download started');
    } catch (error) {
      setMessage('Unable to generate the admit card');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-10 shadow-soft">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Academics & Admit Cards</h2>
            <p className="mt-4 text-slate-600">Check your exam eligibility and download admit cards once your fee status is confirmed.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900">Exam Readiness</h3>
                <p className="mt-3 text-slate-600">Track your registration and prepare for the upcoming examination schedule.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900">Admit Card</h3>
                <p className="mt-3 text-slate-600">Download the admit card securely after payment confirmation and print it before exams.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-50 p-8">
            <h3 className="text-xl font-semibold text-slate-900">Summary</h3>
            <div className="mt-6 space-y-4">
              {loading ? (
                <p className="text-slate-600">Loading fee status...</p>
              ) : status ? (
                <p className={`rounded-3xl bg-white p-5 text-lg font-semibold ${status === 'Paid' ? 'text-schoolGreen' : 'text-schoolOrange'}`}>Current Fee Status: {status}</p>
              ) : (
                <p className="rounded-3xl bg-white p-5 text-slate-600">Login as a student to view your admit card eligibility.</p>
              )}
              <button
                type="button"
                onClick={downloadAdmitCard}
                disabled={user?.role !== 'Student'}
                className="w-full rounded-full bg-schoolBlue px-6 py-3 text-white shadow-sm transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Download Admit Card
              </button>
              {message && <p className="text-sm text-slate-600">{message}</p>}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] bg-schoolBlue/5 p-8">
          <h3 className="text-xl font-semibold text-slate-900">How it works</h3>
          <ul className="mt-6 space-y-4 text-slate-600">
            <li>• Confirm your registration and fee status before exam day.</li>
            <li>• Download your admit card directly from the portal once approved.</li>
            <li>• Print the admit card and bring it to the examination hall.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
