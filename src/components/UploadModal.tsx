import { useMemo, useState } from 'react';
import { BrainCircuit, Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useMemoryStore } from '../store/memoryStore';
import type { AddMemoryInput } from '../types/memory';

export const UploadModal = () => {
  const { uploadModalOpen, setUploadModalOpen, analyzeBeforeSave, createMemory, isAiProcessing, aiPreview } = useMemoryStore();
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const imagePreview = useMemo(() => (image ? URL.createObjectURL(image) : null), [image]);

  if (!uploadModalOpen) return null;

  const payload = (): AddMemoryInput | null => {
    if (!image || !title || !date || !location) return null;
    return { image, title, date, location };
  };

  const runAnalyze = async () => {
    const data = payload();
    if (!data) return toast.error('Please complete all fields before AI analysis.');
    await analyzeBeforeSave(data);
    toast.success('AI analysis complete. Review before saving.');
  };

  const runSave = async () => {
    const data = payload();
    if (!data) return toast.error('Please complete all fields before saving.');
    await createMemory(data);
    toast.success('Memory saved with AI-generated enrichment.');
    setImage(null);
    setTitle('');
    setDate('');
    setLocation('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="glass-panel w-full max-w-4xl rounded-2xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Upload Memory • AI Processing Flow</h2>
          <button onClick={() => setUploadModalOpen(false)} className="text-slate-300"><X /></button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] ?? null)} className="field" />
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="field" />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="field" />
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="field" />
            <button onClick={runAnalyze} disabled={isAiProcessing} className="btn-glass w-full justify-center">
              {isAiProcessing ? <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing memory with AI...</> : <><BrainCircuit className="h-4 w-4" /> Analyze with AI</>}
            </button>
            <button onClick={runSave} disabled={isAiProcessing || !aiPreview} className="btn-primary w-full justify-center">Save Memory</button>
          </div>
          <div className="space-y-3 rounded-2xl border border-slate-700/60 p-4">
            {imagePreview ? <img src={imagePreview} className="h-52 w-full rounded-xl object-cover" /> : <div className="flex h-52 items-center justify-center rounded-xl bg-slate-900/70 text-slate-400">Image preview</div>}
            <p className="text-xs uppercase tracking-wide text-blue-200">AI Results</p>
            {aiPreview ? (
              <>
                <p className="text-sm text-slate-200"><span className="font-semibold">Emotion:</span> {aiPreview.emotion}</p>
                <p className="text-sm text-slate-300"><span className="font-semibold">Generated Description:</span> {aiPreview.description}</p>
              </>
            ) : (
              <p className="text-sm text-slate-400">Run AI analysis to generate emotion and description before saving.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
