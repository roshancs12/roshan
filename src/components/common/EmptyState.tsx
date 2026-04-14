import { BrainCog } from 'lucide-react';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-10 text-center backdrop-blur">
      <BrainCog className="mx-auto mb-3 h-10 w-10 text-ai-500" />
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-slate-300">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
};
