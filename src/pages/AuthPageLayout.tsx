import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface AuthPageLayoutProps {
  title: string;
  subtitle: string;
  alternateText: string;
  alternateLinkLabel: string;
  alternateLinkTo: string;
  children: ReactNode;
}

export const AuthPageLayout = ({ title, subtitle, alternateText, alternateLinkLabel, alternateLinkTo, children }: AuthPageLayoutProps) => (
  <div className="grid min-h-screen place-items-center bg-[linear-gradient(rgba(2,6,23,0.84),rgba(2,6,23,0.84)),url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=80')] bg-cover p-4">
    <div className="w-full max-w-md rounded-2xl border border-white/20 bg-slate-900/60 p-6 backdrop-blur-xl">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <p className="mt-1 text-sm text-slate-300">{subtitle}</p>
      <div className="mt-5">{children}</div>
      <p className="mt-4 text-sm text-slate-300">
        {alternateText}{' '}
        <Link to={alternateLinkTo} className="text-ai-300 hover:text-ai-100">{alternateLinkLabel}</Link>
      </p>
    </div>
  </div>
);
