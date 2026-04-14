import { Brain, CalendarClock, LayoutGrid, MapPinned, UserRound } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'All Memories', icon: LayoutGrid },
  { to: '/timeline', label: 'Timeline', icon: CalendarClock },
  { to: '/map', label: 'Map', icon: MapPinned },
  { to: '/profile', label: 'Profile', icon: UserRound }
];

export const Sidebar = () => (
  <aside className="glass-panel hidden w-64 flex-col rounded-2xl p-5 lg:flex">
    <div className="mb-6 flex items-center gap-2 text-blue-200"><Brain className="h-5 w-5" /> AI Navigation</div>
    <nav className="space-y-2">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${isActive ? 'bg-blue-500/20 text-blue-100' : 'text-slate-300 hover:bg-slate-800/70'}`
          }
        >
          <Icon className="h-4 w-4" /> {label}
        </NavLink>
      ))}
    </nav>
  </aside>
);
