export default function StatCard({ title, value, subtitle, accent = 'cyan' }) {
  const accents = {
    cyan: 'from-cyan-500/20 to-cyan-900/10 border-cyan-700/40',
    emerald: 'from-emerald-500/20 to-emerald-900/10 border-emerald-700/40',
    violet: 'from-violet-500/20 to-violet-900/10 border-violet-700/40',
    rose: 'from-rose-500/20 to-rose-900/10 border-rose-700/40'
  };

  return (
    <article className={`rounded-2xl border bg-gradient-to-br p-4 ${accents[accent]}`}>
      <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-300">{subtitle}</p>
    </article>
  );
}
