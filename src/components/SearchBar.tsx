import { Search, Sparkles } from 'lucide-react';

interface SearchBarProps {
  query: string;
  isSearching: boolean;
  onSearch: (query: string) => void;
}

export const SearchBar = ({ query, isSearching, onSearch }: SearchBarProps) => (
  <div className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3">
    <Search className="h-4 w-4 text-blue-300" />
    <input
      value={query}
      onChange={(event) => onSearch(event.target.value)}
      placeholder="Semantic search: e.g., peaceful evenings near the sea"
      className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
    />
    <div className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-blue-200">
      <Sparkles className="h-3 w-3" />
      {isSearching ? 'Understanding intent…' : 'AI Semantic'}
    </div>
  </div>
);
