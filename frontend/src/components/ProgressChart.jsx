export default function ProgressChart({ title, data, color = '#22d3ee', yLabel }) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-200">{title}</h3>
      <div className="space-y-3">
        {data.map((point) => {
          const width = `${(point.value / maxValue) * 100}%`;
          return (
            <div key={point.label}>
              <div className="mb-1 flex justify-between text-xs text-slate-400">
                <span>{point.label}</span>
                <span>
                  {point.value} {yLabel}
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div className="h-2 rounded-full transition-all duration-700" style={{ width, background: color }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
