import { useState } from 'react';
import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useMemoryStore } from '../../store/memoryStore';
import { useUiStore } from '../../store/uiStore';

export const UploadModal = () => {
  const { isUploadOpen, closeUpload, isAiAnalyzing, setAiAnalyzing } = useUiStore();
  const { createMemory, aiPreview, clearAiPreview } = useMemoryStore();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  if (!isUploadOpen) return null;

  const reset = () => {
    setTitle('');
    setDate('');
    setLocation('');
    setImage(null);
    setPreview('');
    clearAiPreview();
  };

  const onClose = () => {
    reset();
    closeUpload();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!image) {
      toast.error('Please choose an image');
      return;
    }

    setAiAnalyzing(true);
    try {
      await createMemory({ title, date, location, image });
      toast.success('Memory analyzed and saved with AI metadata');
    } catch {
      toast.error('AI analysis failed. Please try again.');
    } finally {
      setAiAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-white/15 bg-slate-900/90 p-6 backdrop-blur">
        <h2 className="text-xl font-semibold text-white">Create Memory with AI Analysis</h2>
        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required className="w-full rounded-lg bg-slate-800 px-3 py-2 text-white" />
          <input value={date} onChange={(e) => setDate(e.target.value)} type="date" required className="w-full rounded-lg bg-slate-800 px-3 py-2 text-white" />
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required className="w-full rounded-lg bg-slate-800 px-3 py-2 text-white" />
          <input type="file" accept="image/*" required onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            setImage(file);
            if (file) setPreview(URL.createObjectURL(file));
          }} className="w-full text-sm text-slate-300" />
          {preview ? <img src={preview} className="h-40 w-full rounded-lg object-cover" /> : null}

          {isAiAnalyzing ? <p className="rounded-lg bg-ai-500/20 p-3 text-sm text-ai-100">Analyzing memory with AI...</p> : null}
          {aiPreview ? (
            <div className="space-y-2 rounded-lg border border-ai-500/50 bg-ai-500/10 p-3 text-sm">
              <p className="text-ai-100">AI-generated description: {aiPreview.description}</p>
              <p className="text-ai-100">Detected emotion: {aiPreview.emotion}</p>
            </div>
          ) : null}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-white/20 px-4 py-2 text-white">Cancel</button>
            <button disabled={isAiAnalyzing} type="submit" className="rounded-lg bg-ai-500 px-4 py-2 font-medium text-white disabled:opacity-60">Analyze & Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};
