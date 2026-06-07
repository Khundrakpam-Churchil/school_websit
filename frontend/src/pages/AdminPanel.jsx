import { useEffect, useState } from 'react';

export default function AdminPanel({ user }) {
  const [students, setStudents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [forms, setForms] = useState({ reg_no: '', student_name: '', password: '', class_name: '', roll_number: '', photo_url: '', fee_status: 'Pending', noticeTitle: '', noticeContent: '', galleryCategory: 'Campus', galleryImageUrl: '', galleryCaption: '' });
  const [message, setMessage] = useState('');

  const fetchAll = () => {
    fetch('http://localhost:5000/api/admin/students')
      .then((res) => res.json())
      .then((data) => data.success && setStudents(data.students));
    fetch('http://localhost:5000/api/notices')
      .then((res) => res.json())
      .then((data) => data.success && setNotices(data.notices));
    fetch('http://localhost:5000/api/gallery')
      .then((res) => res.json())
      .then((data) => data.success && setGallery(data.gallery));
  };

  useEffect(() => {
    if (user?.role === 'Admin') fetchAll();
  }, [user]);

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
    setMessage(data.message || 'Student operation complete');
    if (data.success) fetchAll();
  };

  const handleFeeUpdate = async (reg_no, fee_status) => {
    const response = await fetch(`http://localhost:5000/api/admin/students/${reg_no}/fee`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fee_status }),
    });
    const data = await response.json();
    setMessage(data.message || 'Updated fee status');
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
    setMessage(data.message || 'Notice operation complete');
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
    setMessage(data.message || 'Gallery item saved');
    if (data.success) fetchAll();
  };

  if (!user || user.role !== 'Admin') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-semibold text-slate-900">Admin Panel</h2>
        <p className="mt-4 text-slate-600">Only admin users can access student management, fee updates, notices, and gallery uploads.</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-10 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Admin Panel</h2>
            <p className="mt-3 text-slate-600">Manage students, fees, notices, and gallery content from a centralized dashboard.</p>
          </div>
          {message && <div className="rounded-full bg-schoolGreen/10 px-5 py-3 text-sm font-medium text-schoolGreen">{message}</div>}
        </div>

        <div className="mt-10 grid gap-10 xl:grid-cols-2">
          <div className="space-y-8">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-semibold text-slate-900">Add Student</h3>
              <form className="mt-6 space-y-4" onSubmit={handleStudentSubmit}>
                <input value={forms.reg_no} onChange={(e) => setForms((prev) => ({ ...prev, reg_no: e.target.value }))} type="text" placeholder="Registration Number" className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3" />
                <input value={forms.student_name} onChange={(e) => setForms((prev) => ({ ...prev, student_name: e.target.value }))} type="text" placeholder="Student Name" className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3" />
                <input value={forms.password} onChange={(e) => setForms((prev) => ({ ...prev, password: e.target.value }))} type="password" placeholder="Password" className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3" />
                <input value={forms.class_name} onChange={(e) => setForms((prev) => ({ ...prev, class_name: e.target.value }))} type="text" placeholder="Class" className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3" />
                <input value={forms.roll_number} onChange={(e) => setForms((prev) => ({ ...prev, roll_number: e.target.value }))} type="text" placeholder="Roll Number" className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3" />
                <input value={forms.photo_url} onChange={(e) => setForms((prev) => ({ ...prev, photo_url: e.target.value }))} type="text" placeholder="Photo URL" className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3" />
                <button type="submit" className="rounded-full bg-schoolBlue px-6 py-3 text-white shadow-sm hover:bg-blue-600">Save Student</button>
              </form>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-semibold text-slate-900">Update Fee Status</h3>
              <div className="mt-6 space-y-4">
                {students.map((student) => (
                  <div key={student.reg_no} className="rounded-3xl bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{student.student_name}</p>
                        <p className="text-sm text-slate-500">{student.reg_no} • {student.class_name}</p>
                      </div>
                      <select
                        value={student.fee_status}
                        onChange={(e) => handleFeeUpdate(student.reg_no, e.target.value)}
                        className="rounded-full border border-slate-300 bg-slate-100 px-4 py-2"
                      >
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-semibold text-slate-900">Manage Notices</h3>
              <form className="mt-6 space-y-4" onSubmit={handleNoticeSubmit}>
                <input value={forms.noticeTitle} onChange={(e) => setForms((prev) => ({ ...prev, noticeTitle: e.target.value }))} type="text" placeholder="Notice Title" className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3" />
                <textarea value={forms.noticeContent} onChange={(e) => setForms((prev) => ({ ...prev, noticeContent: e.target.value }))} rows="4" placeholder="Notice Content" className="w-full rounded-[1.5rem] border border-slate-300 bg-white px-4 py-3"></textarea>
                <button type="submit" className="rounded-full bg-schoolOrange px-6 py-3 text-white shadow-sm hover:bg-orange-500">Add Notice</button>
              </form>
              <div className="mt-8 space-y-3">
                {notices.slice(0, 4).map((notice) => (
                  <div key={notice.id} className="rounded-3xl bg-white p-4 shadow-sm">
                    <h4 className="font-semibold text-slate-900">{notice.title}</h4>
                    <p className="mt-1 text-sm text-slate-600">{notice.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-semibold text-slate-900">Upload Gallery Image</h3>
              <form className="mt-6 space-y-4" onSubmit={handleGallerySubmit}>
                <select value={forms.galleryCategory} onChange={(e) => setForms((prev) => ({ ...prev, galleryCategory: e.target.value }))} className="w-full rounded-full border border-slate-300 bg-white px-4 py-3">
                  <option>Campus</option>
                  <option>Classrooms</option>
                  <option>Sports</option>
                  <option>Hostel</option>
                  <option>Events</option>
                </select>
                <input value={forms.galleryImageUrl} onChange={(e) => setForms((prev) => ({ ...prev, galleryImageUrl: e.target.value }))} type="text" placeholder="Image URL" className="w-full rounded-full border border-slate-300 bg-white px-4 py-3" />
                <input value={forms.galleryCaption} onChange={(e) => setForms((prev) => ({ ...prev, galleryCaption: e.target.value }))} type="text" placeholder="Caption" className="w-full rounded-full border border-slate-300 bg-white px-4 py-3" />
                <button type="submit" className="rounded-full bg-schoolBlue px-6 py-3 text-white shadow-sm hover:bg-blue-600">Upload Image</button>
              </form>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {gallery.slice(0, 4).map((item) => (
                  <img key={item.id} src={item.image_url} alt={item.caption} className="h-32 w-full rounded-3xl object-cover" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
