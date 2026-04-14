import { Search, Sparkles, X } from 'lucide-react';

interface SearchBarProps {
  query: string;
  loading: boolean;
  onChange: (value: string) => void;
  onClear: () => void;
}

export const SearchBar = ({ query, loading, onChange, onClear }: SearchBarProps) => {
  return (
    <div className="relative rounded-xl border border-blue-400/30 bg-slate-900/70">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-300" />
      <input
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Semantic search: e.g. peaceful sunset with family"
        className="w-full rounded-xl bg-transparent py-3 pl-12 pr-24 text-sm text-blue-50 outline-none placeholder:text-blue-200/60"
      />
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2 text-xs text-blue-200">
        {loading ? <Sparkles className="h-4 w-4 animate-pulse" /> : null}
        {query ? (
          <button onClick={onClear} className="rounded p-1 hover:bg-white/10" aria-label="Clear search">
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
};
