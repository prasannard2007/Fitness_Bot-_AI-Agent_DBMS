'use client';

import { useEffect, useMemo, useState } from 'react';
import Nav from '../../components/Nav';
import { api } from '../../lib/api';
import StatCard from '../../components/StatCard';
import ProgressChart from '../../components/ProgressChart';
import LoadingSkeleton from '../../components/LoadingSkeleton';

const fallbackWorkouts = [
  { name: 'HIIT', duration_minutes: 35, calories_burned: 420 },
  { name: 'Strength', duration_minutes: 50, calories_burned: 360 },
  { name: 'Yoga', duration_minutes: 40, calories_burned: 180 },
  { name: 'Run', duration_minutes: 30, calories_burned: 300 }
];

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [profileRes, workoutsRes] = await Promise.all([api('/users/me/profile'), api('/workouts')]);
        setProfile(profileRes);
        setWorkouts(workoutsRes);
      } catch {
        setProfile({ full_name: 'Demo User', goal: 'fat_loss', activity_level: 'high', weight_kg: 63 });
        setWorkouts(fallbackWorkouts);
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    }
    load();
  }, []);

  const stats = useMemo(() => {
    const totalCalories = workouts.reduce((sum, w) => sum + (w.calories_burned || 0), 0);
    const totalMinutes = workouts.reduce((sum, w) => sum + (w.duration_minutes || 0), 0);
    return {
      sessions: workouts.length,
      calories: totalCalories,
      minutes: totalMinutes,
      goal: profile?.goal || 'general_fitness'
    };
  }, [workouts, profile]);

  const caloriesSeries = workouts.slice(0, 6).map((w, i) => ({ label: w.name || `Session ${i + 1}`, value: w.calories_burned || 0 }));
  const durationSeries = workouts.slice(0, 6).map((w, i) => ({ label: w.name || `Session ${i + 1}`, value: w.duration_minutes || 0 }));

  return (
    <>
      <Nav />
      <section className="mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="mt-1 text-slate-400">Track your goals, activity trends, and AI-generated progress insights.</p>
      </section>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Weekly Sessions" value={stats.sessions} subtitle="Completed workouts" accent="cyan" />
            <StatCard title="Calories Burned" value={stats.calories} subtitle="Total kcal" accent="emerald" />
            <StatCard title="Training Time" value={`${stats.minutes} min`} subtitle="Active minutes" accent="violet" />
            <StatCard title="Current Goal" value={stats.goal} subtitle={`Activity: ${profile?.activity_level || 'moderate'}`} accent="rose" />
          </section>

          <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ProgressChart title="Calories Trend" data={caloriesSeries} color="#22d3ee" yLabel="kcal" />
            <ProgressChart title="Duration Trend" data={durationSeries} color="#a78bfa" yLabel="min" />
          </section>

          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="mb-2 text-sm font-semibold text-slate-200">Profile Snapshot</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-slate-800/60 p-3"><p className="text-xs text-slate-400">Name</p><p>{profile?.full_name || '-'}</p></div>
              <div className="rounded-xl bg-slate-800/60 p-3"><p className="text-xs text-slate-400">Goal</p><p>{profile?.goal || '-'}</p></div>
              <div className="rounded-xl bg-slate-800/60 p-3"><p className="text-xs text-slate-400">Weight</p><p>{profile?.weight_kg || '-'} kg</p></div>
              <div className="rounded-xl bg-slate-800/60 p-3"><p className="text-xs text-slate-400">Activity</p><p>{profile?.activity_level || '-'}</p></div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
