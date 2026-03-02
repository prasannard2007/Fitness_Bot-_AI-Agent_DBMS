'use client';

import { useEffect, useState } from 'react';
import Nav from '../../components/Nav';
import { api } from '../../lib/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/workouts')
      .then(setWorkouts)
      .catch(() =>
        setWorkouts([
          { id: '1', name: 'Push Day', duration_minutes: 45, intensity: 'high', calories_burned: 380 },
          { id: '2', name: 'Leg Day', duration_minutes: 50, intensity: 'medium', calories_burned: 420 }
        ])
      )
      .finally(() => setTimeout(() => setLoading(false), 500));
  }, []);

  return (
    <>
      <Nav />
      <h2 className="mb-1 text-2xl font-bold">Workouts</h2>
      <p className="mb-5 text-slate-400">Personalized sessions generated and tracked by your AI coach.</p>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl border border-slate-800 bg-slate-900" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {workouts.map((w) => (
            <article key={w.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 transition hover:border-cyan-500/60">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-cyan-300">{w.name}</h3>
                <span className="rounded-full bg-slate-800 px-2 py-1 text-xs uppercase text-slate-300">{w.intensity || 'n/a'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                <p>Duration: <span className="font-medium text-white">{w.duration_minutes} min</span></p>
                <p>Calories: <span className="font-medium text-white">{w.calories_burned || 0} kcal</span></p>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
