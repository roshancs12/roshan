import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '../../store/authStore';

export const AppShell = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-[url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed bg-center p-4">
      <div className="absolute inset-0 bg-slate-950/80" />
      <div className="relative z-10 mx-auto flex max-w-7xl gap-4">
        <Sidebar />
        <main className="glass-panel min-h-[90vh] flex-1 rounded-2xl p-5 md:p-8">
          <Outlet />
          <button onClick={onLogout} className="mt-8 text-sm text-rose-300 hover:text-rose-200">Logout</button>
        </main>
      </div>
    </div>
  );
};
