import { Search } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => Promise<void>;
  loading: boolean;
}

export const SearchBar = ({ onSearch, loading }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Semantic search: e.g. joyful beach sunset with friends"
        className="w-full rounded-xl border border-white/15 bg-slate-900/70 py-3 pl-12 pr-4 text-sm text-white outline-none ring-ai-500 transition focus:ring"
      />
      {loading ? <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-ai-300">Searching...</span> : null}
    </form>
  );
};
