'use client';

import { useState } from 'react';
import Nav from '../../../components/Nav';
import { api } from '../../../lib/api';

export default function Onboarding() {
  const [state, setState] = useState({ fullName: '', email: '', password: '' });

  async function submit(e) {
    e.preventDefault();
    const user = await api('/auth/register', { method: 'POST', body: JSON.stringify(state) });
    alert(`User created: ${user.email}`);
  }

  return (
    <>
      <h2>Onboarding</h2>
      <Nav />
      <form onSubmit={submit} style={{ display: 'grid', gap: 10 }}>
        <input placeholder="Full Name" onChange={(e) => setState({ ...state, fullName: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setState({ ...state, email: e.target.value })} />
        <input placeholder="Password" type="password" onChange={(e) => setState({ ...state, password: e.target.value })} />
        <button type="submit">Create account</button>
      </form>
    </>
  );
}
