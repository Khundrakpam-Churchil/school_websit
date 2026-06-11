"use client";
import { forwardRef } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Hash, 
  BookOpen,
  Fingerprint,
  QrCode,
  Shield
} from 'lucide-react';

const AdmitCard = forwardRef(({ exam, student }, ref) => {
  return (
    <div 
      ref={ref} 
      className="w-[210mm] min-h-[297mm] bg-white p-8 mx-auto shadow-2xl relative overflow-hidden print:shadow-none"
      style={{ 
        fontFamily: 'system-ui, -apple-system, sans-serif',
        printColorAdjust: 'exact',
        WebkitPrintColorAdjust: 'exact'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <div className="w-96 h-96 border-[20px] border-blue-600 rounded-full flex items-center justify-center">
          <GraduationCap className="w-48 h-48 text-blue-600" />
        </div>
      </div>

      {/* Header */}
      <div className="relative border-b-4 border-blue-600 pb-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">SPRINGFIELD SCHOOL</h1>
              <p className="text-sm text-slate-500 font-medium">123 Education Lane, Springfield • EST. 1985</p>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mt-1">Official Examination Admit Card</p>
            </div>
          </div>
          <div className="text-right">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300">
              <div className="text-center">
                <User className="w-8 h-8 text-slate-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400 font-medium">Photo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Title */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-4 mb-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6" />
            <div>
              <h2 className="text-lg font-bold">ADMIT CARD</h2>
              <p className="text-blue-100 text-xs">Academic Year 2026-2027 • Final Examination</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-blue-100">Card No.</p>
            <p className="text-lg font-bold font-mono">AC-2026-{String(student.id).padStart(4, '0')}</p>
          </div>
        </div>
      </div>

      {/* Student Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Student Details</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Name:</span>
              <span className="text-sm font-bold text-slate-900">{student.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Class:</span>
              <span className="text-sm font-bold text-slate-900">{student.class}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Roll No:</span>
              <span className="text-sm font-bold text-slate-900">{student.rollNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Reg. No:</span>
              <span className="text-sm font-bold text-slate-900 font-mono">{student.regNo}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Examination Details</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Subject:</span>
              <span className="text-sm font-bold text-slate-900">{exam.subject}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Date:</span>
              <span className="text-sm font-bold text-slate-900">{exam.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Time:</span>
              <span className="text-sm font-bold text-slate-900">{exam.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Venue:</span>
              <span className="text-sm font-bold text-slate-900">{exam.room}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Schedule Table */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Examination Schedule
        </h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="text-left px-4 py-3 text-xs font-bold uppercase rounded-tl-lg">Subject</th>
              <th className="text-left px-4 py-3 text-xs font-bold uppercase">Date</th>
              <th className="text-left px-4 py-3 text-xs font-bold uppercase">Time</th>
              <th className="text-left px-4 py-3 text-xs font-bold uppercase">Room</th>
              <th className="text-left px-4 py-3 text-xs font-bold uppercase rounded-tr-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-slate-50 border-b border-slate-200">
              <td className="px-4 py-3 text-sm font-semibold text-slate-900">{exam.subject}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{exam.date}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{exam.time}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{exam.room}</td>
              <td className="px-4 py-3">
                <span className="inline-flex px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                  APPROVED
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Instructions */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-2">
          <Fingerprint className="w-4 h-4" />
          Important Instructions
        </h3>
        <ul className="space-y-1.5 text-xs text-amber-700">
          <li className="flex items-start gap-2">
            <span className="font-bold">1.</span> Report to examination hall 30 minutes before scheduled time
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">2.</span> Bring this admit card, valid student ID, and necessary stationery
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">3.</span> Electronic devices (mobile phones, calculators, smart watches) are strictly prohibited
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">4.</span> Use only blue/black ballpoint pens for writing answers
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">5.</span> Any form of malpractice will result in immediate disqualification
          </li>
        </ul>
      </div>

      {/* Footer with QR and Signatures */}
      <div className="flex items-end justify-between mt-auto pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center">
            <QrCode className="w-16 h-16 text-slate-400" />
          </div>
          <div className="text-xs text-slate-500">
            <p className="font-bold text-slate-700 mb-1">Scan to Verify</p>
            <p>Authenticate this admit card</p>
            <p>using the school portal app</p>
          </div>
        </div>

        <div className="text-center">
          <div className="w-32 h-12 border-b-2 border-slate-400 mb-2" />
          <p className="text-xs font-bold text-slate-700">Principals Signature</p>
          <p className="text-[10px] text-slate-500">Dr. Sarah Johnson</p>
        </div>

        <div className="text-center">
          <div className="w-32 h-12 border-b-2 border-slate-400 mb-2" />
          <p className="text-xs font-bold text-slate-700">Exam Controller</p>
          <p className="text-[10px] text-slate-500">Prof. Michael Chen</p>
        </div>
      </div>

      {/* Security Footer */}
      <div className="mt-6 pt-4 border-t border-slate-200 text-center">
        <p className="text-[10px] text-slate-400 uppercase tracking-wider">
          This is an official document of Springfield School • Unauthorized reproduction is prohibited
        </p>
        <p className="text-[10px] text-slate-400 mt-1">
          Generated on {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {new Date().toLocaleTimeString('en-US')}
        </p>
      </div>
    </div>
  );
});

AdmitCard.displayName = 'AdmitCard';

export default AdmitCard;