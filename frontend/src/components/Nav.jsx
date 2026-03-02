import Link from 'next/link';

const items = [
  ['Home', '/'],
  ['Onboarding', '/auth/onboarding'],
  ['Dashboard', '/dashboard'],
  ['Workouts', '/workouts'],
  ['AI Coach', '/chat']
];

export default function Nav() {
  return (
    <header className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-semibold tracking-tight text-cyan-300">Fitness Bot • Agentic AI</h1>
        <nav className="flex flex-wrap gap-2">
          {items.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
