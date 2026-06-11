import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  Bell, 
  Calendar, 
  TrendingUp,
  Users,
  Award,
  BookOpen,
  GraduationCap,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, role, isAuthenticated, getFeeStatus } = useAuth();
  const navigate = useNavigate();
  const feeInfo = getFeeStatus();

  // NOT LOGGED IN - Show sign in prompt
  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-white rounded-3xl p-12 max-w-md mx-auto shadow-lg border border-slate-200">
          <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Please Sign In</h2>
          <p className="text-slate-500 mb-6">You need to be logged in to view your dashboard.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-600 transition-all"
          >
            Go to Home & Sign In
          </button>
        </div>
      </div>
    );
  }

  // Get user display info based on role
  const getDisplayName = () => {
    if (role === 'student') return user?.student_name || 'Student';
    if (role === 'admin') return user?.full_name || 'Admin';
    if (role === 'faculty') return user?.full_name || 'Faculty';
    return 'User';
  };

  const getInitials = () => {
    const name = getDisplayName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRoleLabel = () => {
    if (role === 'student') return `${user?.class_name || ''} • Roll No: ${user?.roll_number || ''}`;
    if (role === 'faculty') return `${user?.department || ''} Department`;
    if (role === 'admin') return 'Administrator';
    return '';
  };

  const getRoleColor = () => {
    if (role === 'student') return 'bg-blue-500';
    if (role === 'admin') return 'bg-orange-500';
    if (role === 'faculty') return 'bg-purple-500';
    return 'bg-slate-500';
  };

  // Student-specific stats
  const studentStats = [
    { 
      label: 'Upcoming Exams', 
      value: user?.exams_registered?.length || 0, 
      icon: FileText, 
      color: 'text-blue-600 bg-blue-50',
      path: '/exams'
    },
    { 
      label: 'Fee Status', 
      value: user?.fee_status === 'Paid' ? 'Cleared' : user?.fee_status || 'N/A', 
      icon: CreditCard, 
      color: user?.fee_status === 'Paid' ? 'text-emerald-600 bg-emerald-50' : 'text-orange-600 bg-orange-50',
      path: '/fees'
    },
    { 
      label: 'New Notices', 
      value: '5', 
      icon: Bell, 
      color: 'text-purple-600 bg-purple-50',
      path: '/notices'
    },
    { 
      label: 'Subjects', 
      value: user?.exams_registered?.length || 0, 
      icon: BookOpen, 
      color: 'text-emerald-600 bg-emerald-50',
      path: '/exams'
    },
  ];

  const quickActions = [
    {
      icon: FileText,
      title: 'Exam Registration',
      desc: 'Register for upcoming exams and download admit cards.',
      path: '/exams',
      color: 'bg-blue-50 text-blue-600',
      borderColor: 'border-blue-200',
    },
    {
      icon: CreditCard,
      title: 'Fee Management',
      desc: 'Check fee status, view payment history, and make payments.',
      path: '/fees',
      color: 'bg-emerald-50 text-emerald-600',
      borderColor: 'border-emerald-200',
    },
    {
      icon: Bell,
      title: 'Notices & Updates',
      desc: 'Stay informed with real-time announcements.',
      path: '/notices',
      color: 'bg-orange-50 text-orange-600',
      borderColor: 'border-orange-200',
    },
    {
      icon: Calendar,
      title: 'Academic Calendar',
      desc: 'View important dates and examination schedules.',
      path: '/exams',
      color: 'bg-purple-50 text-purple-600',
      borderColor: 'border-purple-200',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Banner */}
      <div className="mb-8">
        <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative flex items-center gap-5">
            <div className={`w-16 h-16 ${getRoleColor()} rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
              {getInitials()}
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-1">Welcome, {getDisplayName()}</h1>
              <p className="text-slate-300 text-sm flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                {getRoleLabel()}
              </p>
            </div>
            
            {/* Fee Status Badge for Students */}
            {role === 'student' && (
              <div className="ml-auto hidden sm:flex items-center gap-2">
                <div className={`px-4 py-2 rounded-xl flex items-center gap-2 border ${
                  user?.fee_status === 'Paid' 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                    : user?.fee_status === 'Partial'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-red-500/20 text-red-300 border-red-500/30'
                }`}>
                  {user?.fee_status === 'Paid' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">Fee: {user?.fee_status}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {studentStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i}
              onClick={() => navigate(stat.path)}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Profile Information
          </h3>
          
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 ${getRoleColor()} rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
              {getInitials()}
            </div>
            <div>
              <h2 className="font-bold text-slate-900">{getDisplayName()}</h2>
              <p className="text-sm text-slate-500">{getRoleLabel()}</p>
            </div>
          </div>

          <div className="space-y-3">
            {role === 'student' && (
              <>
                <div className="flex justify-between text-sm p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500">Registration No:</span>
                  <span className="font-semibold text-slate-900 font-mono">{user?.reg_no}</span>
                </div>
                <div className="flex justify-between text-sm p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500">Class:</span>
                  <span className="font-semibold text-slate-900">{user?.class_name}</span>
                </div>
                <div className="flex justify-between text-sm p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500">Roll Number:</span>
                  <span className="font-semibold text-slate-900">{user?.roll_number}</span>
                </div>
              </>
            )}
            
            <div className="flex justify-between text-sm p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-500">Role:</span>
              <span className="font-semibold text-slate-900 capitalize">{role}</span>
            </div>

            {role === 'student' && (
              <div className="flex justify-between text-sm p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Fee Status:</span>
                <span className={`font-semibold ${
                  user?.fee_status === 'Paid' ? 'text-emerald-600' : 'text-orange-600'
                }`}>
                  {user?.fee_status}
                </span>
              </div>
            )}
          </div>

          {/* Admit Card Status */}
          {role === 'student' && (
            <div className={`mt-4 p-4 rounded-xl border-2 ${
              feeInfo?.can_download 
                ? 'bg-emerald-50 border-emerald-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {feeInfo?.can_download ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-semibold text-sm ${
                  feeInfo?.can_download ? 'text-emerald-800' : 'text-red-800'
                }`}>
                  Admit Card: {user?.admit_card_status?.toUpperCase() || 'N/A'}
                </span>
              </div>
              <p className={`text-xs ${
                feeInfo?.can_download ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {feeInfo?.can_download 
                  ? '✓ You can download your admit cards from the Exams page.' 
                  : '✗ Admit card download is blocked. Please clear your fees first.'}
              </p>
              {!feeInfo?.can_download && (
                <button
                  onClick={() => navigate('/fees')}
                  className="mt-3 w-full py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Pay Fees Now
                </button>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <button 
                  key={i}
                  onClick={() => navigate(action.path)}
                  className={`group text-left bg-white rounded-2xl p-5 border ${action.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{action.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{action.desc}</p>
                  <div className="flex items-center text-sm font-medium text-slate-400 group-hover:text-blue-500 transition-colors mt-3">
                    Go to page
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Recent Notices */}
          <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-500" />
              Recent Notices
            </h3>
            <div className="space-y-3">
              {[
                { title: 'Annual Examination Schedule Released', date: 'June 5, 2026', type: 'Examination' },
                { title: 'Fee Payment Reminder', date: 'June 2, 2026', type: 'Administration' },
                { title: 'Admit Card Generation Notice', date: 'June 5, 2026', type: 'Examination' },
              ].map((notice, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{notice.title}</p>
                    <p className="text-xs text-slate-500">{notice.date} • {notice.type}</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => navigate('/notices')}
              className="mt-4 w-full py-2.5 text-sm font-medium text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"
            >
              View All Notices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}