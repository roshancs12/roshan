interface HeatmapProps {
  values: Record<string, number>;
}

const intensityClass = (value: number): string => {
  if (value >= 5) return 'bg-blue-400';
  if (value >= 3) return 'bg-blue-500/80';
  if (value >= 1) return 'bg-blue-700/80';
  return 'bg-slate-800';
};

export const Heatmap = ({ values }: HeatmapProps) => {
  const cells = Object.entries(values).slice(-90);

  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))' }}>
      {cells.map(([day, count]) => (
        <div key={day} className={`h-3 w-3 rounded-sm ${intensityClass(count)}`} title={`${day}: ${count}`} />
      ))}
    </div>
  );
};
