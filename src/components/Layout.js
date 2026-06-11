"use client";
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Menu, 
  X, 
  Home, 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  Bell, 
  Images,
  ChevronRight,
  LogIn,
  LogOut,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/exams', label: 'Exams', icon: FileText },
  { path: '/fees', label: 'Fees', icon: CreditCard },
  { path: '/notices', label: 'Notices', icon: Bell },
  { path: '/gallery', label: 'Gallery', icon: Images },
];

export default function Layout({ children }) {
  const { user, role, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    if (role === 'student') return user.student_name;
    if (role === 'admin') return user.full_name;
    if (role === 'faculty') return user.full_name;
    return '';
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getUserRoleColor = () => {
    if (role === 'student') return 'from-blue-500 to-blue-600';
    if (role === 'admin') return 'from-orange-500 to-orange-600';
    if (role === 'faculty') return 'from-purple-500 to-purple-600';
    return 'from-slate-500 to-slate-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-orange-50/20">
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-soft border-b border-slate-200/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-schoolBlue to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-schoolOrange rounded-full animate-pulse-glow" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-slate-800 leading-tight">Springfield</h1>
                <p className="text-xs text-slate-500 font-medium">School Portal</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive 
                        ? 'text-schoolBlue bg-blue-50' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-schoolBlue rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
                    <div className={`w-8 h-8 bg-gradient-to-br ${getUserRoleColor()} rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                      {getUserInitials()}
                    </div>
                    <div className="hidden md:block">
                      <p className="text-xs font-semibold text-slate-800">{getUserDisplayName()}</p>
                      <p className="text-xs text-slate-500 capitalize">{role}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="group flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-schoolBlue to-blue-600 text-white rounded-xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <LogIn className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-3 space-y-1 bg-white/95 backdrop-blur-xl border-t border-slate-200/50">
            {!isAuthenticated && (
              <button
                onClick={() => {
                  setLoginModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-blue-50 text-schoolBlue mb-2"
              >
                <LogIn className="w-5 h-5" />
                Sign In to Portal
                <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
              </button>
            )}
            
            {isAuthenticated && (
              <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-slate-50 rounded-xl">
                <div className={`w-10 h-10 bg-gradient-to-br ${getUserRoleColor()} rounded-xl flex items-center justify-center text-white font-bold`}>
                  {getUserInitials()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{getUserDisplayName()}</p>
                  <p className="text-xs text-slate-500 capitalize">{role}</p>
                </div>
              </div>
            )}

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-blue-50 text-schoolBlue' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </Link>
              );
            })}

            {isAuthenticated && (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all mt-2"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            )}
          </div>
        </div>
      </nav>

      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
      />

      <main className="pt-16 lg:pt-20">
        <div className="animate-fade-in-up">
          {children}
        </div>
      </main>

      <footer className="mt-20 bg-white border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-schoolBlue to-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-slate-800">Springfield School</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Empowering students with excellence in education since 1985. 
                Building tomorrows leaders today.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Quick Links</h3>
              <div className="space-y-2">
                {navItems.slice(1).map((item) => (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    className="block text-sm text-slate-500 hover:text-schoolBlue transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-slate-500">
                <p>123 Education Lane, Springfield</p>
                <p>contact@springfield.edu</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200/50 text-center text-sm text-slate-400">
            © 2026 Springfield School. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}