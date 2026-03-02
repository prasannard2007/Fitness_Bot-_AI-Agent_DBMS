'use client';

import { useEffect, useState } from 'react';
import Nav from '../../components/Nav';
import { api } from '../../lib/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    api('/workouts').then(setWorkouts).catch(() => setWorkouts([]));
  }, []);

  return (
    <>
      <h2>Workout Plans</h2>
      <Nav />
      {workouts.map((w) => (
        <article key={w.id} style={{ border: '1px solid #334155', padding: 12, marginBottom: 8 }}>
          <h3>{w.name}</h3>
          <p>{w.duration_minutes} min • {w.intensity}</p>
        </article>
      ))}
    </>
  );
}
