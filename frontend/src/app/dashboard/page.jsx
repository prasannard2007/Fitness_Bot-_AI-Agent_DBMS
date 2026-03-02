'use client';

import { useEffect, useState } from 'react';
import Nav from '../../components/Nav';
import { api } from '../../lib/api';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api('/users/me/profile').then(setProfile).catch(() => setProfile({ error: 'Login required' }));
  }, []);

  return (
    <>
      <h2>Dashboard & Progress</h2>
      <Nav />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </>
  );
}
