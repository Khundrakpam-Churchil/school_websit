import { Bell, Calendar, Pin, ChevronRight } from 'lucide-react';

export default function Notices() {
  const notices = [
    { 
      title: 'Final Examination Schedule Released', 
      date: 'June 5, 2026', 
      category: 'Examination',
      pinned: true,
      content: 'The final examination schedule for the academic year 2025-2026 has been released. Please check your dashboard for details.'
    },
    { 
      title: 'Annual Sports Day Registration Open', 
      date: 'June 3, 2026', 
      category: 'Sports',
      pinned: true,
      content: 'Registration for the Annual Sports Day is now open. All students are encouraged to participate.'
    },
    { 
      title: 'Fee Payment Deadline Extended', 
      date: 'June 1, 2026', 
      category: 'Administration',
      pinned: false,
      content: 'The deadline for the quarterly fee payment has been extended to June 15, 2026.'
    },
    { 
      title: 'New Library Hours', 
      date: 'May 28, 2026', 
      category: 'General',
      pinned: false,
      content: 'The school library will now be open from 7:00 AM to 6:00 PM on weekdays.'
    },
  ];

  const categories = ['All', 'Examination', 'Sports', 'Administration', 'General'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Notices & Announcements</h1>
        <p className="text-slate-500">Stay updated with the latest school news and announcements.</p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat, i) => (
          <button 
            key={i}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              i === 0 
                ? 'bg-schoolBlue text-white shadow-lg shadow-blue-500/25' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-schoolBlue hover:text-schoolBlue'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {notices.map((notice, i) => (
          <div key={i} className={`glass-card rounded-2xl p-6 hover-lift ${notice.pinned ? 'border-l-4 border-l-schoolBlue' : ''}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    {notice.title}
                    {notice.pinned && <Pin className="w-4 h-4 text-schoolBlue fill-schoolBlue" />}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {notice.date}</span>
                    <span className="px-2 py-0.5 bg-slate-100 rounded-full text-slate-600">{notice.category}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{notice.content}</p>
            <button className="text-sm font-medium text-schoolBlue hover:text-blue-700 flex items-center gap-1">
              Read more <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}