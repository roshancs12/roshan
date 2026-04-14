import { LogOut, Map, Timer, User, Vault } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const navItems = [
  { to: '/', label: 'All Memories', icon: Vault },
  { to: '/timeline', label: 'Timeline', icon: Timer },
  { to: '/map', label: 'Map', icon: Map },
  { to: '/profile', label: 'Profile', icon: User }
];

export const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside className="sticky top-4 h-[calc(100vh-2rem)] w-full max-w-60 rounded-2xl border border-blue-400/20 bg-slate-950/80 p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-200">Memories</h2>
        <p className="text-sm text-blue-300/70">Your AI memory vault</p>
      </div>
      <nav className="space-y-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${isActive ? 'bg-blue-600/30 text-blue-50' : 'text-blue-200 hover:bg-white/5'}`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <button onClick={logout} className="mt-8 flex items-center gap-2 text-sm text-red-300 hover:text-red-200"><LogOut className="h-4 w-4" />Logout</button>
    </aside>
  );
};
