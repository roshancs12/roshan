import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => (
  <div className="min-h-screen bg-[linear-gradient(rgba(2,6,23,0.9),rgba(2,6,23,0.95)),url('https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-fixed p-4 md:p-6">
    <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[240px_1fr]">
      <Sidebar />
      <main>{children}</main>
    </div>
  </div>
);
