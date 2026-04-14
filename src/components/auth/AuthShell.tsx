import type { PropsWithChildren } from 'react';
import { GlassPanel } from '../common/GlassPanel';

interface AuthShellProps extends PropsWithChildren {
  title: string;
  subtitle: string;
}

export const AuthShell = ({ title, subtitle, children }: AuthShellProps) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4">
      <img
        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80"
        className="absolute inset-0 h-full w-full object-cover"
        alt="background"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-blue-950/80 to-slate-900/90" />
      <GlassPanel className="relative z-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="mt-1 text-sm text-blue-100/80">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </GlassPanel>
    </div>
  );
};
