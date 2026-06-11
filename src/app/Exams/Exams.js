import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  Lock,
  CreditCard,
  X
} from 'lucide-react';
import AdmitCardDownload from '../components/AdmitCardDownload';

export default function Exams() {
  const { user, role, isAuthenticated, canDownloadAdmitCard, getFeeStatus } = useAuth();
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState(null);
  const [showAdmitCard, setShowAdmitCard] = useState(false);
  const [showFeeBlockModal, setShowFeeBlockModal] = useState(false);
  const [feeBlockReason, setFeeBlockReason] = useState('');

  const examSchedule = [
    { subject: 'Mathematics', date: 'June 15, 2026', time: '9:00 AM - 12:00 PM', room: 'Hall A', code: 'MATH101' },
    { subject: 'Physics', date: 'June 17, 2026', time: '9:00 AM - 12:00 PM', room: 'Hall B', code: 'PHY201' },
    { subject: 'Chemistry', date: 'June 19, 2026', time: '9:00 AM - 12:00 PM', room: 'Hall A', code: 'CHEM301' },
    { subject: 'English Literature', date: 'June 21, 2026', time: '1:00 PM - 4:00 PM', room: 'Hall C', code: 'ENG401' },
    { subject: 'Biology', date: 'June 23, 2026', time: '9:00 AM - 12:00 PM', room: 'Hall B', code: 'BIO501' },
    { subject: 'Computer Science', date: 'June 25, 2026', time: '1:00 PM - 4:00 PM', room: 'Lab 3', code: 'CS601' }
  ];

  const getStudentExamStatus = (exam) => {
    if (!isAuthenticated || role !== 'student' || !user) {
      return { status: 'not_logged_in', canDownload: false };
    }

    const feeInfo = getFeeStatus();
    if (!feeInfo.can_download) {
      return { 
        status: 'fee_blocked', 
        canDownload: false,
        reason: feeInfo.status === 'Pending' 
          ? 'Your fee payment is pending. Please clear all dues to download the admit card.'
          : feeInfo.status === 'Partial'
          ? 'Your fee payment is partially complete. Please pay the remaining amount.'
          : 'Your admit card has been declined due to fee issues.'
      };
    }

    const isRegistered = user.exams_registered?.includes(exam.subject);
    return { 
      status: isRegistered ? 'registered' : 'not_registered', 
      canDownload: isRegistered 
    };
  };

  const handleDownloadClick = (exam) => {
    if (!isAuthenticated) {
      setFeeBlockReason('Please sign in to download your admit card.');
      setShowFeeBlockModal(true);
      return;
    }

    if (role !== 'student') {
      setFeeBlockReason('Only students can download admit cards.');
      setShowFeeBlockModal(true);
      return;
    }

    const status = getStudentExamStatus(exam);
    
    if (!status.canDownload) {
      setFeeBlockReason(status.reason || 'You cannot download this admit card.');
      setShowFeeBlockModal(true);
      return;
    }

    setSelectedExam(exam);
    setShowAdmitCard(true);
  };

  const handlePayFee = () => {
    setShowFeeBlockModal(false);
    navigate('/fees');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Exam Registration</h1>
        <p className="text-slate-500">Manage your exam registrations and download admit cards.</p>
      </div>

      {/* Fee Status Banner for Students */}
      {isAuthenticated && role === 'student' && user && (
        <div className={`mb-6 p-4 rounded-xl border-2 ${
          user.fee_status === 'Paid' 
            ? 'bg-emerald-50 border-emerald-200' 
            : user.fee_status === 'Partial'
            ? 'bg-amber-50 border-amber-200'
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              user.fee_status === 'Paid' ? 'bg-emerald-100' : user.fee_status === 'Partial' ? 'bg-amber-100' : 'bg-red-100'
            }`}>
              {user.fee_status === 'Paid' ? (
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertCircle className={`w-5 h-5 ${user.fee_status === 'Partial' ? 'text-amber-600' : 'text-red-600'}`} />
              )}
            </div>
            <div className="flex-1">
              <p className={`font-semibold ${
                user.fee_status === 'Paid' ? 'text-emerald-800' : user.fee_status === 'Partial' ? 'text-amber-800' : 'text-red-800'
              }`}>
                Fee Status: {user.fee_status}
              </p>
              <p className={`text-sm ${
                user.fee_status === 'Paid' ? 'text-emerald-600' : user.fee_status === 'Partial' ? 'text-amber-600' : 'text-red-600'
              }`}>
                {user.fee_status === 'Paid' 
                  ? '✓ All fees cleared. You can download your admit cards.' 
                  : user.fee_status === 'Partial'
                  ? '⚠ Partial payment detected. Complete payment to download admit cards.'
                  : '✗ Fee payment pending. Admit card download is blocked.'}
              </p>
            </div>
            {user.fee_status !== 'Paid' && (
              <button
                onClick={() => navigate('/fees')}
                className="px-4 py-2 bg-white rounded-lg text-sm font-medium border hover:shadow-md transition-all flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Pay Now
              </button>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {examSchedule.map((exam, i) => {
            const status = getStudentExamStatus(exam);
            
            return (
              <div key={i} className="glass-card rounded-2xl p-6 hover-lift">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{exam.subject}</h3>
                      <p className="text-xs text-slate-400 font-mono mb-1">{exam.code}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {exam.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {exam.time}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {exam.room}</span>
                      </div>
                    </div>
                  </div>
                  
                  {isAuthenticated && role === 'student' && (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      status.status === 'registered' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : status.status === 'fee_blocked'
                        ? 'bg-red-50 text-red-600'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {status.status === 'registered' ? 'Registered' : status.status === 'fee_blocked' ? 'Blocked' : 'Not Registered'}
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  {status.canDownload ? (
                    <button 
                      onClick={() => handleDownloadClick(exam)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download Admit Card
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleDownloadClick(exam)}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-400 rounded-lg text-sm font-medium cursor-not-allowed"
                      disabled={status.status === 'fee_blocked'}
                    >
                      <Lock className="w-4 h-4" />
                      {status.status === 'fee_blocked' ? 'Fee Payment Required' : 'Sign In Required'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-4">Exam Guidelines</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                Arrive 30 minutes before the exam
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                Bring your student ID and admit card
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                No electronic devices allowed
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                Use only blue/black ballpoint pens
              </li>
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-amber-50 to-white border-amber-200">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-amber-800">Important Notice</h3>
            </div>
            <p className="text-sm text-amber-700 leading-relaxed">
              Admit cards will only be issued to students with cleared fee status. 
              Please ensure all dues are paid before the examination date.
            </p>
          </div>
        </div>
      </div>

      {/* Admit Card Download Modal */}
      {showAdmitCard && selectedExam && (
        <AdmitCardDownload 
          exam={selectedExam}
          isOpen={showAdmitCard}
          onClose={() => {
            setShowAdmitCard(false);
            setSelectedExam(null);
          }}
        />
      )}

      {/* Fee Block Modal */}
      {showFeeBlockModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={() => setShowFeeBlockModal(false)} />
          
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Access Denied</h2>
                  <p className="text-red-100 text-sm">Admit Card Download Blocked</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-200 mb-4">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 leading-relaxed">{feeBlockReason}</p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handlePayFee}
                  className="w-full py-3 bg-gradient-to-r from-schoolBlue to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Go to Fee Payment
                </button>
                
                <button
                  onClick={() => setShowFeeBlockModal(false)}
                  className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all"
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