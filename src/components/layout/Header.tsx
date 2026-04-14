import { MapPinned, Plus, UserCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../memory/SearchBar';

interface HeaderProps {
  query: string;
  loading: boolean;
  onQueryChange: (value: string) => void;
  onClear: () => void;
  onNew: () => void;
}

export const Header = ({ query, loading, onQueryChange, onClear, onNew }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-blue-200">Memories AI</h1>
          <p className="text-sm text-blue-200/70">Intelligently indexed life moments</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => navigate('/map')} className="rounded-xl border border-blue-400/40 bg-slate-900 px-4 py-2 text-blue-100 hover:bg-slate-800"><MapPinned className="mr-1 inline h-4 w-4" />Map</button>
          <button onClick={() => navigate('/profile')} className="rounded-xl border border-blue-400/40 bg-slate-900 px-4 py-2 text-blue-100 hover:bg-slate-800"><UserCircle2 className="mr-1 inline h-4 w-4" />Profile</button>
          <button onClick={onNew} className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"><Plus className="mr-1 inline h-4 w-4" />New Memory</button>
        </div>
      </div>
      <SearchBar query={query} loading={loading} onChange={onQueryChange} onClear={onClear} />
    </header>
  );
};
