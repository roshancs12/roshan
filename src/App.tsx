import { useEffect, type ReactElement } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { LoginPage } from './pages/LoginPage';
import { MapPage } from './pages/MapPage';
import { MemoryDetailPage } from './pages/MemoryDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { SignupPage } from './pages/SignupPage';
import { TimelinePage } from './pages/TimelinePage';
import { useAuthStore } from './store/authStore';

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const user = useAuthStore((state) => state.user);
  const authReady = useAuthStore((state) => state.authReady);

  if (!authReady) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-blue-100">Loading session...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const bootstrap = useAuthStore((state) => state.bootstrap);

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/timeline" element={<PrivateRoute><TimelinePage /></PrivateRoute>} />
        <Route path="/map" element={<PrivateRoute><MapPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/memory/:id" element={<PrivateRoute><MemoryDetailPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" toastOptions={{ style: { background: '#0f172a', color: '#dbeafe' } }} />
    </>
  );
};

export default App;
