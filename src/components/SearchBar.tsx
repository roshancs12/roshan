import type { ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
      <label htmlFor="semantic-search" className="mb-2 block text-sm font-medium text-slate-700">
        Semantic Search
      </label>
      <input
        id="semantic-search"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Try: friends at sunset, calm forest mornings..."
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-ai-500"
      />
      <p className="mt-2 text-xs text-slate-500">AI maps meaning across caption, tags, and context.</p>
    </div>
  );
};
