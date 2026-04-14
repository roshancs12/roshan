interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onToggle: (tag: string) => void;
}

export const TagFilter = ({ tags, selectedTags, onToggle }: TagFilterProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-800">Tag Filter</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const selected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onToggle(tag)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                selected
                  ? 'bg-ai-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              #{tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};
