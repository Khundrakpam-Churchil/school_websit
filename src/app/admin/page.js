'use client';

import { useEffect, useState } from 'react';
import { 
  Users, 
  CreditCard, 
  Bell, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  ChevronRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminPanel({ user }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [forms, setForms] = useState({ 
    reg_no: '', 
    student_name: '', 
    password: '', 
    class_name: '', 
    roll_number: '', 
    photo_url: '', 
    fee_status: 'Pending', 
    noticeTitle: '', 
    noticeContent: '', 
    galleryCategory: 'Campus', 
    galleryImageUrl: '', 
    galleryCaption: '' 
  });
  const [message, setMessage] = useState('');

  const fetchAll = () => {
    fetch('http://localhost:5000/api/admin/students')
      .then((res) => res.json())
      .then((data) => data.success && setStudents(data.students))
      .catch((err) => console.error('Failed to fetch students:', err));
    fetch('http://localhost:5000/api/notices')
      .then((res) => res.json())
      .then((data) => data.success && setNotices(data.notices))
      .catch((err) => console.error('Failed to fetch notices:', err));
    fetch('http://localhost:5000/api/gallery')
      .then((res) => res.json())
      .then((data) => data.success && setGallery(data.gallery))
      .catch((err) => console.error('Failed to fetch gallery:', err));
  };

  useEffect(() => {
    // In actual implementation, replace user check with context or props correctly.
    // Assuming `user` prop is passed if the parent is fetching auth.
    // But since this is a Next.js Page component, `user` is undefined unless passed or fetched.
    // For safety, let's just fetch anyway, assuming the backend protects the API.
    fetchAll();
  }, []);

  const handleStudentSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      reg_no: forms.reg_no,
      student_name: forms.student_name,
      password: forms.password,
      class_name: forms.class_name,
      roll_number: forms.roll_number,
      photo_url: forms.photo_url,
    };
    const response = await fetch('http://localhost:5000/api/admin/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    showMessage(data.message || 'Student operation complete', data.success);
    if (data.success) fetchAll();
  };

  const handleFeeUpdate = async (reg_no, fee_status) => {
    const response = await fetch(`http://localhost:5000/api/admin/students/${reg_no}/fee`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fee_status }),
    });
    const data = await response.json();
    showMessage(data.message || 'Updated fee status', data.success);
    if (data.success) fetchAll();
  };

  const handleNoticeSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/api/notices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: forms.noticeTitle, content: forms.noticeContent }),
    });
    const data = await response.json();
    showMessage(data.message || 'Notice operation complete', data.success);
    if (data.success) fetchAll();
  };

  const handleGallerySubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: forms.galleryCategory, image_url: forms.galleryImageUrl, caption: forms.galleryCaption }),
    });
    const data = await response.json();
    showMessage(data.message || 'Gallery item saved', data.success);
    if (data.success) fetchAll();
  };

  const showMessage = (msg, isSuccess = true) => {
    setMessage({ text: msg, type: isSuccess ? 'success' : 'error' });
    setTimeout(() => setMessage(''), 3000);
  };

  const tabs = [
    { id: 'students', label: 'Students', icon: Users },
    { id: 'fees', label: 'Fee Status', icon: CreditCard },
    { id: 'notices', label: 'Notices', icon: Bell },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-[auto] md:min-h-screen">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white flex items-center gap-3 tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-schoolOrange flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            Admin Console
          </h2>
        </div>

        <nav className="p-4 flex-1 space-y-2">
          <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 mt-4">Management</p>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-blue-600/10 text-schoolBlue font-bold' 
                    : 'hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-schoolBlue' : 'text-slate-400'}`} />
                {tab.label}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => router.push('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all"
          >
            <LogOut className="w-5 h-5" />
            Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          {/* Header & Notifications */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                {tabs.find(t => t.id === activeTab)?.label}
              </h1>
              <p className="text-slate-500 mt-1">Manage and update system records securely.</p>
            </div>

            {/* Toast Notification */}
            {message && (
              <div className={`px-4 py-3 rounded-xl flex items-center gap-2 shadow-sm border ${
                message.type === 'success' 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                  : 'bg-red-50 text-red-800 border-red-200'
              }`}>
                {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span className="text-sm font-semibold">{message.text}</span>
              </div>
            )}
          </div>

          {/* TAB CONTENT PANES */}
          
          {/* STUDENTS TAB */}
          {activeTab === 'students' && (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Add New Student</h3>
                  <p className="text-sm text-slate-500">Register a student to generate their portal access.</p>
                </div>
              </div>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleStudentSubmit}>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Reg No</label>
                  <input value={forms.reg_no} onChange={(e) => setForms((prev) => ({ ...prev, reg_no: e.target.value }))} type="text" placeholder="e.g. REG2025001" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Student Name</label>
                  <input value={forms.student_name} onChange={(e) => setForms((prev) => ({ ...prev, student_name: e.target.value }))} type="text" placeholder="Full Name" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                  <input value={forms.password} onChange={(e) => setForms((prev) => ({ ...prev, password: e.target.value }))} type="text" placeholder="Set temporary password" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Class</label>
                  <input value={forms.class_name} onChange={(e) => setForms((prev) => ({ ...prev, class_name: e.target.value }))} type="text" placeholder="e.g. Grade 10-A" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Roll Number</label>
                  <input value={forms.roll_number} onChange={(e) => setForms((prev) => ({ ...prev, roll_number: e.target.value }))} type="text" placeholder="Roll No" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Photo URL</label>
                  <input value={forms.photo_url} onChange={(e) => setForms((prev) => ({ ...prev, photo_url: e.target.value }))} type="text" placeholder="https://..." className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                
                <div className="md:col-span-2 mt-4 pt-6 border-t border-slate-100 flex justify-end">
                  <button type="submit" className="rounded-xl bg-schoolBlue px-8 py-3 text-white font-bold shadow-md shadow-blue-500/20 hover:bg-blue-600 transition-colors">
                    Register Student
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* FEES TAB */}
          {activeTab === 'fees' && (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Update Fee Status</h3>
                  <p className="text-sm text-slate-500">Manage student payments to unlock admit cards.</p>
                </div>
              </div>

              <div className="space-y-4">
                {students.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                    No students registered yet.
                  </div>
                ) : (
                  students.map((student) => (
                    <div key={student.reg_no} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div>
                        <p className="font-bold text-slate-900">{student.student_name}</p>
                        <p className="text-xs text-slate-500 mt-1 font-mono">{student.reg_no} • {student.class_name}</p>
                      </div>
                      <div className="mt-3 sm:mt-0">
                        <select
                          value={student.fee_status}
                          onChange={(e) => handleFeeUpdate(student.reg_no, e.target.value)}
                          className={`rounded-xl border font-bold text-sm px-4 py-2 outline-none cursor-pointer ${
                            student.fee_status === 'Paid' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                              : 'bg-orange-50 text-orange-700 border-orange-200'
                          }`}
                        >
                          <option value="Paid">Paid</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* NOTICES TAB */}
          {activeTab === 'notices' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Publish Notice</h3>
                    <p className="text-sm text-slate-500">Broadcast updates to the portal.</p>
                  </div>
                </div>

                <form className="space-y-5" onSubmit={handleNoticeSubmit}>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Title</label>
                    <input value={forms.noticeTitle} onChange={(e) => setForms((prev) => ({ ...prev, noticeTitle: e.target.value }))} type="text" placeholder="Notice Title" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Content</label>
                    <textarea value={forms.noticeContent} onChange={(e) => setForms((prev) => ({ ...prev, noticeContent: e.target.value }))} rows="4" placeholder="Full announcement text..." className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" required></textarea>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button type="submit" className="rounded-xl bg-purple-600 px-8 py-3 text-white font-bold shadow-md shadow-purple-500/20 hover:bg-purple-700 transition-colors">Publish</button>
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Recent Announcements</h3>
                <div className="space-y-4">
                  {notices.length === 0 ? (
                    <p className="text-slate-500 text-sm">No notices published yet.</p>
                  ) : (
                    notices.slice(0, 5).map((notice) => (
                      <div key={notice.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <h4 className="font-bold text-slate-900">{notice.title}</h4>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{notice.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Upload to Gallery</h3>
                    <p className="text-sm text-slate-500">Add new memories to the public website.</p>
                  </div>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleGallerySubmit}>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                    <select value={forms.galleryCategory} onChange={(e) => setForms((prev) => ({ ...prev, galleryCategory: e.target.value }))} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                      <option>Campus</option>
                      <option>Classrooms</option>
                      <option>Sports</option>
                      <option>Hostel</option>
                      <option>Events</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Caption</label>
                    <input value={forms.galleryCaption} onChange={(e) => setForms((prev) => ({ ...prev, galleryCaption: e.target.value }))} type="text" placeholder="Image description" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Image URL</label>
                    <input value={forms.galleryImageUrl} onChange={(e) => setForms((prev) => ({ ...prev, galleryImageUrl: e.target.value }))} type="url" placeholder="https://..." className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" required />
                  </div>
                  
                  <div className="md:col-span-2 mt-4 flex justify-end">
                    <button type="submit" className="rounded-xl bg-emerald-600 px-8 py-3 text-white font-bold shadow-md shadow-emerald-500/20 hover:bg-emerald-700 transition-colors">Upload Image</button>
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Recent Uploads</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {gallery.length === 0 ? (
                    <p className="col-span-full text-slate-500 text-sm">No images in gallery.</p>
                  ) : (
                    gallery.slice(0, 6).map((item) => (
                      <div key={item.id} className="relative group rounded-2xl overflow-hidden aspect-video border border-slate-200 bg-slate-100">
                        <img src={item.image_url} alt={item.caption} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <p className="text-white text-xs font-medium truncate">{item.caption}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
