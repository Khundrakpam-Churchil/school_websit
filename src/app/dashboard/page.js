'use client';

import { useAuth } from '@/context/AuthContext';
import { 
  FileText, 
  CreditCard, 
  Bell, 
  Calendar, 
  TrendingUp,
  Users,
  BookOpen,
  GraduationCap,
  AlertCircle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, role, isAuthenticated, getFeeStatus } = useAuth();
  const router = useRouter();
  const feeInfo = getFeeStatus();

  // NOT LOGGED IN - Show sign in prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 max-w-md mx-auto shadow-2xl border border-white/50 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-schoolBlue to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/30 transform -rotate-6">
            <GraduationCap className="w-12 h-12 text-white transform rotate-6" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Portal Access</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">Please authenticate to view your personalized dashboard and access your academic records.</p>
          <button
            onClick={() => router.push('/')}
            className="w-full px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-schoolBlue hover:-translate-y-1 transition-all duration-300"
          >
            Return to Homepage
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
    if (role === 'student') return 'from-blue-500 to-indigo-600';
    if (role === 'admin') return 'from-orange-500 to-red-500';
    if (role === 'faculty') return 'from-purple-500 to-pink-600';
    return 'from-slate-500 to-slate-700';
  };

  // Student-specific stats
  const studentStats = [
    { 
      label: 'Upcoming Exams', 
      value: user?.exams_registered?.length || 0, 
      icon: FileText, 
      color: 'text-blue-600',
      bgLight: 'bg-blue-100',
      path: '/exams'
    },
    { 
      label: 'Fee Status', 
      value: user?.fee_status === 'Paid' ? 'Cleared' : user?.fee_status || 'N/A', 
      icon: CreditCard, 
      color: user?.fee_status === 'Paid' ? 'text-emerald-600' : 'text-orange-600',
      bgLight: user?.fee_status === 'Paid' ? 'bg-emerald-100' : 'bg-orange-100',
      path: '/fees'
    },
    { 
      label: 'New Notices', 
      value: '5', 
      icon: Bell, 
      color: 'text-purple-600',
      bgLight: 'bg-purple-100',
      path: '/notices'
    },
    { 
      label: 'Subjects', 
      value: user?.exams_registered?.length || 0, 
      icon: BookOpen, 
      color: 'text-schoolBlue',
      bgLight: 'bg-schoolBlue/10',
      path: '/exams'
    },
  ];

  const quickActions = [
    {
      icon: FileText,
      title: 'Exam Registration',
      path: '/exams',
      gradient: 'from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: CreditCard,
      title: 'Fee Management',
      path: '/fees',
      gradient: 'from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100',
      iconColor: 'text-emerald-600'
    },
    {
      icon: Bell,
      title: 'Notices',
      path: '/notices',
      gradient: 'from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100',
      iconColor: 'text-orange-600'
    },
    {
      icon: Calendar,
      title: 'Calendar',
      path: '/exams',
      gradient: 'from-purple-50 to-fuchsia-50 hover:from-purple-100 hover:to-fuchsia-100',
      iconColor: 'text-purple-600'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Main Welcome Banner (Spans 2-3 cols) */}
          <div className="md:col-span-3 lg:col-span-3 bg-gradient-to-br from-slate-900 via-slate-800 to-schoolBlue rounded-[2rem] p-8 sm:p-10 text-white relative overflow-hidden shadow-xl shadow-schoolBlue/10 flex flex-col justify-center">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className={`w-20 h-20 bg-gradient-to-br ${getRoleColor()} rounded-[1.5rem] flex items-center justify-center text-white text-3xl font-bold shadow-2xl border-4 border-white/10 shrink-0`}>
                {getInitials()}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight">Good to see you, {getDisplayName().split(' ')[0]}!</h1>
                <p className="text-slate-300 text-lg flex items-center gap-2 font-medium">
                  <GraduationCap className="w-5 h-5 opacity-70" />
                  {getRoleLabel()}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Quick Look (Spans 1 col) */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white shadow-soft flex flex-col items-center justify-center text-center">
            <div className="w-full">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center justify-center gap-2">
                <Users className="w-4 h-4" /> Identity
              </h3>
              <h2 className="text-xl font-bold text-slate-900 mb-1">{getDisplayName()}</h2>
              <p className="text-schoolBlue font-medium mb-6 capitalize">{role}</p>
              
              {role === 'student' && (
                <div className="space-y-3 w-full bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Class</span>
                    <span className="font-bold text-slate-900">{user?.class_name}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Reg No</span>
                    <span className="font-bold text-slate-900 font-mono">{user?.reg_no}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Row (4 mini bento boxes) */}
          {studentStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={i}
                onClick={() => router.push(stat.path)}
                className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 border border-white shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-[1.25rem] ${stat.bgLight} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight mb-1">{stat.value}</div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                </div>
              </div>
            );
          })}

          {/* Fee Alert / Admit Card Box (Spans 2 cols) */}
          {role === 'student' && (
            <div className={`md:col-span-2 lg:col-span-2 rounded-[2rem] p-8 border backdrop-blur-xl shadow-soft flex flex-col justify-center relative overflow-hidden ${
              feeInfo?.can_download 
                ? 'bg-gradient-to-br from-emerald-50/80 to-teal-50/80 border-emerald-100' 
                : 'bg-gradient-to-br from-red-50/80 to-rose-50/80 border-red-100'
            }`}>
              <div className="relative z-10 flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                  feeInfo?.can_download ? 'bg-emerald-200/50 text-emerald-700' : 'bg-red-200/50 text-red-700'
                }`}>
                  {feeInfo?.can_download ? <CheckCircle className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${feeInfo?.can_download ? 'text-emerald-900' : 'text-red-900'}`}>
                    Admit Card {feeInfo?.can_download ? 'Ready' : 'Blocked'}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 ${feeInfo?.can_download ? 'text-emerald-700' : 'text-red-700'}`}>
                    {feeInfo?.can_download 
                      ? 'Your fee status is cleared. You can now download your official examination admit cards from the exams portal.' 
                      : 'Admit card generation is currently restricted due to pending fee dues. Please clear your balance to proceed.'}
                  </p>
                  <button
                    onClick={() => router.push(feeInfo?.can_download ? '/exams' : '/fees')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-transform hover:-translate-y-0.5 ${
                      feeInfo?.can_download 
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {feeInfo?.can_download ? 'Go to Exams' : 'Pay Pending Fees'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions (Spans 2 cols) */}
          <div className="md:col-span-2 lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white shadow-soft">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, i) => {
                const Icon = action.icon;
                return (
                  <button 
                    key={i}
                    onClick={() => router.push(action.path)}
                    className={`bg-gradient-to-br ${action.gradient} rounded-[1.5rem] p-4 sm:p-5 flex items-center gap-4 text-left transition-all duration-300 hover:shadow-md border border-white/50`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center shrink-0 shadow-sm ${action.iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-slate-800 tracking-tight leading-tight">{action.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}