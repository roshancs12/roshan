import type { PropsWithChildren } from 'react';
import { cn } from '../../utils/cn';

interface GlassPanelProps extends PropsWithChildren {
  className?: string;
}

export const GlassPanel = ({ className, children }: GlassPanelProps) => {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl backdrop-saturate-150',
        className
      )}
    >
      {children}
    </div>
  );
};
