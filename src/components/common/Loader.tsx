export const Loader = ({ text }: { text?: string }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-10 text-blue-100">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-200 border-t-blue-500" />
    {text && <p className="text-sm">{text}</p>}
  </div>
);
