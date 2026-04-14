import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Brain, ImagePlus, Sparkles, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useMemoryStore } from '../../store/memoryStore';
import { GlassPanel } from '../common/GlassPanel';

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
}

const initialForm = { title: '', date: '', location: '', image: null as File | null };

export const UploadModal = ({ open, onClose }: UploadModalProps) => {
  const {
    analyzeDraftWithAI,
    saveAnalyzedMemory,
    aiProcessing,
    savingMemory,
    uploadPreview,
    resetPreview
  } = useMemoryStore();
  const [form, setForm] = useState(initialForm);

  const imageUrl = useMemo(() => (form.image ? URL.createObjectURL(form.image) : ''), [form.image]);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  if (!open) return null;

  const closeModal = () => {
    setForm(initialForm);
    resetPreview();
    onClose();
  };

  const validateForm = () => {
    if (!form.image || !form.title || !form.date || !form.location) {
      toast.error('Fill all fields and choose an image.');
      return false;
    }
    return true;
  };

  const runAIAnalysis = async (event: FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      await analyzeDraftWithAI({
        title: form.title,
        date: form.date,
        location: form.location,
        image: form.image!
      });
      toast.success('AI analysis complete. Review before saving.');
    } catch {
      toast.error('AI processing failed. Please retry.');
    }
  };

  const finalizeSave = async () => {
    try {
      await saveAnalyzedMemory();
      toast.success('Memory enriched by AI and saved.');
      closeModal();
    } catch {
      toast.error('Failed to save analyzed memory.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <GlassPanel className="w-full max-w-xl bg-slate-900/80">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-blue-50">Create AI-Enriched Memory</h3>
          <button onClick={closeModal} className="rounded p-1 hover:bg-white/10"><X /></button>
        </div>

        <form className="space-y-3" onSubmit={runAIAnalysis}>
          <input className="w-full rounded-lg border border-blue-400/30 bg-slate-900 p-2.5 text-blue-50" placeholder="Title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input type="date" className="w-full rounded-lg border border-blue-400/30 bg-slate-900 p-2.5 text-blue-50" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} />
            <input className="w-full rounded-lg border border-blue-400/30 bg-slate-900 p-2.5 text-blue-50" placeholder="Location" value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} />
          </div>
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-blue-300/40 bg-slate-900/70 p-3 text-blue-100">
            <ImagePlus className="h-4 w-4" /> Upload image
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setForm((p) => ({ ...p, image: e.target.files?.[0] ?? null }))} />
          </label>

          {imageUrl ? <img src={imageUrl} alt="preview" className="h-44 w-full rounded-lg object-cover" /> : null}

          {aiProcessing ? (
            <div className="rounded-lg border border-blue-400/30 bg-blue-500/10 p-3 text-sm text-blue-100">Analyzing memory with AI...</div>
          ) : null}

          {uploadPreview ? (
            <div className="space-y-2 rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm text-emerald-100">
              <p className="font-medium">AI Analysis Complete</p>
              <p><span className="font-semibold">Emotion:</span> {uploadPreview.emotion}</p>
              <p><span className="font-semibold">Description:</span> {uploadPreview.description}</p>
              <p className="inline-flex items-center gap-1 text-xs"><Sparkles className="h-3.5 w-3.5" /> Embedding vector generated and ready for semantic retrieval.</p>
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button className="rounded-lg border border-blue-400/40 bg-slate-800 py-2.5 font-semibold text-blue-100 hover:bg-slate-700" type="submit" disabled={aiProcessing || savingMemory}>
              {aiProcessing ? 'Analyzing...' : 'Analyze with AI'}
            </button>
            <button className="rounded-lg bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60" type="button" onClick={finalizeSave} disabled={!uploadPreview || aiProcessing || savingMemory}>
              {savingMemory ? 'Saving memory...' : 'Save analyzed memory'}
            </button>
          </div>

          <p className="inline-flex items-center gap-1 text-xs text-blue-300"><Brain className="h-3.5 w-3.5" /> Description and emotion are generated by backend AI services.</p>
        </form>
      </GlassPanel>
    </div>
  );
};
