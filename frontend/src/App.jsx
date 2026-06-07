import { useMemo, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Academics from './pages/Academics';
import Fee from './pages/Fee';
import NoticeBoard from './pages/NoticeBoard';
import GalleryPage from './pages/GalleryPage';
import AdminPanel from './pages/AdminPanel';
import Registration from './pages/Registration';
import Hostel from './pages/Hostel';
import About from './pages/About';
import LoginModal from './components/LoginModal';

const initialUser = null;

function App() {
  const [user, setUser] = useState(initialUser);
  const [showLogin, setShowLogin] = useState(false);
  const [role, setRole] = useState('Student');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const isAdmin = useMemo(() => user?.role === 'Admin', [user]);
  const isStudent = useMemo(() => user?.role === 'Student', [user]);

  const handleLogin = async (payload) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!data.success) {
        setMessage(data.message || 'Login failed');
        return;
      }

      setUser({ role: data.role, profile: data.user });
      setShowLogin(false);
      setMessage('');
      if (data.role === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setMessage('Unable to connect to the server');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setMessage('You have been logged out');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-schoolLight text-slate-900">
      <Navbar
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
        user={user}
      />
      {message && !showLogin && (
        <div className="bg-sky-50 border-b border-slate-200 py-3 text-center text-sm text-slate-700">
          {message}
        </div>
      )}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={<Dashboard user={user} />}
          />
          <Route path="/academics" element={<Academics user={user} />} />
          <Route path="/fee" element={<Fee user={user} />} />
          <Route path="/notice" element={<NoticeBoard />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/admin" element={<AdminPanel user={user} />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/hostel" element={<Hostel />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
      {showLogin && (
        <LoginModal
          defaultRole={role}
          onClose={() => setShowLogin(false)}
          onSubmit={handleLogin}
          message={message}
        />
      )}
    </div>
  );
}

export default App;
