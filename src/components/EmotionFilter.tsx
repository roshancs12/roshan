import type { Emotion } from '../types/memory';

interface EmotionFilterProps {
  value: Emotion | 'all';
  onChange: (emotion: Emotion | 'all') => void;
}

const emotions: Array<Emotion | 'all'> = ['all', 'happy', 'nostalgic', 'calm', 'excited', 'reflective'];

export const EmotionFilter = ({ value, onChange }: EmotionFilterProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-800">Emotion Filter</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {emotions.map((emotion) => (
          <button
            key={emotion}
            onClick={() => onChange(emotion)}
            className={`rounded-lg border px-3 py-2 text-xs font-medium capitalize transition ${
              value === emotion
                ? 'border-ai-500 bg-ai-50 text-ai-700'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            {emotion}
          </button>
        ))}
      </div>
    </div>
  );
};
