'use client';

import { useEffect, useState } from 'react';

export default function NoticeBoardPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/notices')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setNotices(data.notices);
      })
      .catch((err) => console.error('Error loading notices:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-10 shadow-soft">
        <h2 className="text-3xl font-semibold text-slate-900">Notice Board</h2>
        <p className="mt-4 text-slate-600">Stay up to date with all academic announcements, exam updates, and student alerts.</p>

        <div className="mt-10 space-y-6">
          {loading ? (
            <p className="text-slate-600 font-medium">Loading notices...</p>
          ) : notices.length ? (
            notices.map((notice) => (
              <article key={notice.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-2xl font-semibold text-slate-900">{notice.title}</h3>
                  <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-500 font-medium">{new Date(notice.created_at).toLocaleDateString()}</span>
                </div>
                <p className="mt-4 text-slate-600">{notice.content}</p>
              </article>
            ))
          ) : (
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-500">
              No notices available at the moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
