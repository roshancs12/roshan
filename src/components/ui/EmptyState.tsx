interface Props {
  title: string;
  description: string;
  ctaLabel: string;
  onCtaClick: () => void;
}

export const EmptyState = ({ title, description, ctaLabel, onCtaClick }: Props) => (
  <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-12 text-center">
    <p className="text-2xl">🧠</p>
    <p className="mt-2 text-xl font-semibold text-white">{title}</p>
    <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300">{description}</p>
    <button onClick={onCtaClick} className="btn-primary mx-auto mt-5">{ctaLabel}</button>
  </div>
);
