import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: 'All Memories' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/map', label: 'Map' },
  { href: '/profile', label: 'Profile' }
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="rounded-2xl border border-white/15 bg-slate-900/65 p-4 backdrop-blur">
      <h2 className="mb-4 text-2xl font-semibold text-ai-100">Memories</h2>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={clsx('block rounded-lg px-3 py-2 text-sm transition', {
              'bg-ai-500/20 text-ai-100': location.pathname === item.href,
              'text-slate-300 hover:bg-slate-700/40': location.pathname !== item.href
            })}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
