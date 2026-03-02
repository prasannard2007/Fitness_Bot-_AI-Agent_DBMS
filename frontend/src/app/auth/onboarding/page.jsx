'use client';

import { useState } from 'react';
import Nav from '../../../components/Nav';
import { api } from '../../../lib/api';

export default function Onboarding() {
  const [state, setState] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await api('/auth/register', { method: 'POST', body: JSON.stringify(state) });
      alert(`Welcome ${user.full_name || user.email}!`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Nav />
      <div className="mx-auto max-w-xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-2xl font-bold">Create your Fitness Profile</h2>
        <p className="mt-1 text-sm text-slate-400">Tell the AI coach who you are and start personalized planning.</p>
        <form onSubmit={submit} className="mt-5 grid gap-3">
          <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2" placeholder="Full Name" onChange={(e) => setState({ ...state, fullName: e.target.value })} required />
          <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2" placeholder="Email" type="email" onChange={(e) => setState({ ...state, email: e.target.value })} required />
          <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2" placeholder="Password" type="password" onChange={(e) => setState({ ...state, password: e.target.value })} required />
          <button disabled={loading} className="mt-2 rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60">
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </>
  );
}
