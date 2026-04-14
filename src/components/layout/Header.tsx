import { Plus, Map, User } from 'lucide-react';
import { SearchBar } from '../SearchBar';

interface Props {
  query: string;
  isSearching: boolean;
  onSearch: (query: string) => void;
  onOpenUpload: () => void;
}

export const Header = ({ query, isSearching, onSearch, onOpenUpload }: Props) => (
  <header className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-3xl font-bold text-blue-300">Memories AI</p>
        <p className="text-sm text-slate-300">Meaning-based memory exploration powered by AI services</p>
      </div>
      <div className="flex gap-2">
        <button className="btn-glass"><User className="h-4 w-4" />Profile</button>
        <button className="btn-glass"><Map className="h-4 w-4" />Map</button>
        <button onClick={onOpenUpload} className="btn-primary"><Plus className="h-4 w-4" />New Memory</button>
      </div>
    </div>
    <SearchBar query={query} isSearching={isSearching} onSearch={onSearch} />
  </header>
);
