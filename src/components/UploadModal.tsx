import { useMemo, useState } from 'react';
import { aiMemoryService } from '../services/aiMemoryService';
import type { AIGeneratedMetadata } from '../types/memory';

interface UploadModalProps {
  open: boolean;
  processing: boolean;
  onClose: () => void;
  onSubmit: (payload: { imageUrl: string; caption: string }) => Promise<void>;
}

export const UploadModal = ({ open, processing, onClose, onSubmit }: UploadModalProps) => {
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [aiPreview, setAiPreview] = useState<AIGeneratedMetadata | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const canSubmit = useMemo(() => imageUrl.trim().length > 0 && caption.trim().length > 0, [imageUrl, caption]);

  const handleGeneratePreview = async () => {
    setPreviewLoading(true);
    const metadata = await aiMemoryService.generateMetadata({ imageUrl, caption });
    setAiPreview(metadata);
    setPreviewLoading(false);
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    await onSubmit({ imageUrl, caption });
    setImageUrl('');
    setCaption('');
    setAiPreview(null);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Upload Memory</h2>
          <button className="text-sm text-slate-500" onClick={onClose}>Close</button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <input
              type="url"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="Paste image URL"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <textarea
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              placeholder="Describe the moment"
              rows={4}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <button
              onClick={handleGeneratePreview}
              disabled={!canSubmit || previewLoading}
              className="w-full rounded-lg bg-ai-50 px-3 py-2 text-sm font-medium text-ai-700 disabled:opacity-50"
            >
              {previewLoading ? 'Generating AI metadata...' : 'Preview AI understanding'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || processing}
              className="w-full rounded-lg bg-ai-500 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {processing ? 'Saving memory...' : 'Save memory'}
            </button>
          </div>

          <div className="rounded-xl border border-slate-200 p-3">
            {imageUrl ? (
              <img src={imageUrl} alt="Preview" className="mb-3 h-40 w-full rounded-lg object-cover" />
            ) : (
              <div className="mb-3 flex h-40 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-500">
                Image preview
              </div>
            )}
            {aiPreview ? (
              <div className="space-y-2 text-xs text-slate-700">
                <p><span className="font-semibold">Emotion:</span> {aiPreview.emotion}</p>
                <p><span className="font-semibold">Tags:</span> {aiPreview.tags.join(', ')}</p>
                <p><span className="font-semibold">Description:</span> {aiPreview.aiDescription}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-500">AI insight preview appears here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
