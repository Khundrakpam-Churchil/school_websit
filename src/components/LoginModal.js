'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  X, 
  GraduationCap, 
  User, 
  Shield, 
  Eye, 
  EyeOff, 
  LogIn, 
  CheckCircle2,
  AlertCircle,
  Fingerprint
} from 'lucide-react';

const roles = [
  { id: 'student', label: 'Student', icon: GraduationCap, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', textColor: 'text-blue-600' },
  { id: 'faculty', label: 'Faculty', icon: User, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200', textColor: 'text-purple-600' },
  { id: 'admin', label: 'Admin', icon: Shield, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200', textColor: 'text-orange-600' },
];

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('student');
  const [regNumber, setRegNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRobotChecked, setIsRobotChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!regNumber.trim()) {
      setError('Please enter your registration number');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    if (!isRobotChecked) {
      setError('Please verify that you are not a robot');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const result = login(regNumber, password, selectedRole);
      setIsLoading(false);
      
      if (result.success) {
        onClose();
        // Reset form
        setRegNumber('');
        setPassword('');
        setIsRobotChecked(false);
        // Automatically redirect to the correct dashboard!
        router.push(selectedRole === 'admin' ? '/admin' : '/dashboard');
      } else {
        setError(result.error);
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }, 1000);
  };

  const currentRole = roles.find(r => r.id === selectedRole);
  const RoleIcon = currentRole.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className={`relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all ${shake ? 'animate-shake' : ''}`}>
        <div className={`relative bg-gradient-to-br ${currentRole.color} p-8 text-white overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Welcome Back</h2>
              <p className="text-white/80 text-sm">Sign in to your portal</p>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-6 pt-6">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
            Select Role
          </label>
          <div className="grid grid-cols-3 gap-3">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => {
                    setSelectedRole(role.id);
                    setError('');
                  }}
                  className={`relative p-3 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                    isSelected 
                      ? `${role.borderColor} ${role.bgColor} shadow-md` 
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    isSelected ? `bg-gradient-to-br ${role.color} text-white shadow-lg` : 'bg-slate-100 text-slate-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-semibold ${isSelected ? role.textColor : 'text-slate-500'}`}>
                    {role.label}
                  </span>
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm animate-fade-in-up">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-slate-400" />
              {selectedRole === 'student' ? 'Registration Number' : 'Username'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={regNumber}
                onChange={(e) => {
                  setRegNumber(e.target.value);
                  setError('');
                }}
                placeholder={selectedRole === 'student' ? 'e.g., STU2026001' : 'Enter username'}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Shield className="w-4 h-4 text-slate-400" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div 
              onClick={() => {
                setIsRobotChecked(!isRobotChecked);
                setError('');
              }}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                isRobotChecked 
                  ? 'border-emerald-300 bg-emerald-50/50' 
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
              }`}
            >
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                isRobotChecked 
                  ? 'bg-emerald-500 border-emerald-500' 
                  : 'border-slate-300 bg-white'
              }`}>
                {isRobotChecked && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${isRobotChecked ? 'text-emerald-700' : 'text-slate-600'}`}>
                  I&apos;m not a robot
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Verify your humanity to continue</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              isLoading 
                ? 'bg-slate-400 cursor-not-allowed' 
                : `bg-gradient-to-r ${currentRole.color} hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0`
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Sign In as {currentRole.label}
              </>
            )}
          </button>

          <div className="text-center">
            <button type="button" className="text-sm text-slate-500 hover:text-schoolBlue transition-colors font-medium">
              Forgot your password?
            </button>
          </div>
        </form>

        <div className="px-6 pb-6 text-center">
          <p className="text-xs text-slate-400">
            Secure login powered by SORA Maheikol Portal
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}