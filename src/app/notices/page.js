'use client';

import { useState } from 'react';
import { Bell, Calendar, Pin, ChevronRight, X, Download } from 'lucide-react';
import jsPDF from 'jspdf';

export default function Notices() {
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [user] = useState({ student_name: 'John Doe', reg_no: '2026001', class_name: '10-A' });

  const downloadReceipt = (txn) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(30, 58, 138); 
    doc.text('School Exam Portal', 105, 20, null, null, 'center');
    
    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42); 
    doc.text('Fee Receipt', 105, 30, null, null, 'center');
    
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);
    
    // Details
    doc.setFontSize(12);
    doc.text(`Transaction ID: ${txn.id}`, 20, 50);
    doc.text(`Date: ${txn.date}`, 20, 60);
    doc.text(`Status: ${txn.status.toUpperCase()}`, 20, 70);
    
    doc.text(`Student Name: ${user?.student_name || 'N/A'}`, 120, 50);
    doc.text(`Reg No: ${user?.reg_no || 'N/A'}`, 120, 60);
    doc.text(`Class: ${user?.class_name || 'N/A'}`, 120, 70);
    
    doc.setLineWidth(0.2);
    doc.line(20, 80, 190, 80);
    
    // Table Header
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Description', 20, 90);
    doc.text('Amount', 170, 90, null, null, 'right');
    
    doc.line(20, 95, 190, 95);
    
    // Table Body
    doc.setFont('helvetica', 'normal');
    doc.text(txn.type, 20, 105);
    doc.text(`₹${txn.amount}`, 170, 105, null, null, 'right');
    
    doc.line(20, 115, 190, 115);
    
    // Total
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Paid:', 130, 125);
    doc.text(`₹${txn.amount}`, 170, 125, null, null, 'right');
    
    // Footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('This is a computer-generated receipt and does not require a signature.', 105, 150, null, null, 'center');
    
    doc.save(`Receipt_${txn.id}.pdf`);
  };

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
            <button 
              onClick={() => setSelectedNotice(notice)}
              className="text-sm font-medium text-schoolBlue hover:text-blue-700 flex items-center gap-1"
            >
              Read more <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Notice Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={() => setSelectedNotice(null)} />
          
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="flex justify-between items-center bg-gradient-to-br from-schoolBlue to-blue-600 p-6 text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notice Details
              </h2>
              <button onClick={() => setSelectedNotice(null)} className="text-blue-100 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-start gap-2">
                  {selectedNotice.title}
                  {selectedNotice.pinned && <Pin className="w-5 h-5 mt-1 text-schoolBlue fill-schoolBlue shrink-0" />}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {selectedNotice.date}</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded-full text-slate-600">{selectedNotice.category}</span>
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-xl mb-6">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedNotice.content}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-sm font-semibold text-slate-900 mb-1">Additional Notes:</p>
                  <p className="text-sm text-slate-600">Please contact the administration office if you have any questions regarding this notice.</p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}