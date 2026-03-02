'use client';

import { useEffect, useState } from 'react';
import Nav from '../../components/Nav';
import { api } from '../../lib/api';

export default function SetupPage() {
  const [keys, setKeys] = useState({ openaiApiKey: '', anthropicApiKey: '', geminiApiKey: '', webhookUrl: '' });
  const [requirement, setRequirement] = useState({ title: '', details: '', priority: 'medium' });
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([api('/settings/integrations'), api('/requirements')])
      .then(([settingsRes, requirementsRes]) => {
        setKeys(settingsRes);
        setRequirements(requirementsRes);
      })
      .catch(() => null);
  }, []);

  async function saveKeys(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api('/settings/integrations', { method: 'PUT', body: JSON.stringify(keys) });
      alert('Integration settings saved');
    } finally {
      setLoading(false);
    }
  }

  async function addRequirement(e) {
    e.preventDefault();
    const created = await api('/requirements', { method: 'POST', body: JSON.stringify(requirement) });
    setRequirements((prev) => [created, ...prev]);
    setRequirement({ title: '', details: '', priority: 'medium' });
  }

  return (
    <>
      <Nav />
      <h2 className="mb-1 text-2xl font-bold">Project Setup & Requirements</h2>
      <p className="mb-5 text-slate-400">Add your API keys and tell the AI what your side requirements are.</p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <form onSubmit={saveKeys} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <h3 className="mb-3 font-semibold text-cyan-300">API Keys & Integrations</h3>
          <div className="grid gap-3">
            <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2" placeholder="OpenAI API Key" value={keys.openaiApiKey || ''} onChange={(e) => setKeys({ ...keys, openaiApiKey: e.target.value })} />
            <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2" placeholder="Anthropic API Key" value={keys.anthropicApiKey || ''} onChange={(e) => setKeys({ ...keys, anthropicApiKey: e.target.value })} />
            <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2" placeholder="Gemini API Key" value={keys.geminiApiKey || ''} onChange={(e) => setKeys({ ...keys, geminiApiKey: e.target.value })} />
            <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2" placeholder="Webhook URL" value={keys.webhookUrl || ''} onChange={(e) => setKeys({ ...keys, webhookUrl: e.target.value })} />
            <button className="rounded-lg bg-cyan-500 px-3 py-2 font-semibold text-slate-950 disabled:opacity-60" disabled={loading}>{loading ? 'Saving...' : 'Save Integrations'}</button>
          </div>
        </form>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <h3 className="mb-3 font-semibold text-cyan-300">Your Requirements</h3>
          <form onSubmit={addRequirement} className="mb-4 grid gap-2">
            <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2" placeholder="Requirement title" value={requirement.title} onChange={(e) => setRequirement({ ...requirement, title: e.target.value })} required />
            <textarea className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2" placeholder="Describe what should be handled..." value={requirement.details} onChange={(e) => setRequirement({ ...requirement, details: e.target.value })} required rows={3} />
            <select className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2" value={requirement.priority} onChange={(e) => setRequirement({ ...requirement, priority: e.target.value })}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button className="rounded-lg bg-violet-500 px-3 py-2 font-semibold text-white">Add Requirement</button>
          </form>

          <div className="space-y-2">
            {requirements.map((r) => (
              <article key={r.id} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                <div className="mb-1 flex items-center justify-between">
                  <p className="font-medium">{r.title}</p>
                  <span className="text-xs uppercase text-slate-400">{r.priority}</span>
                </div>
                <p className="text-sm text-slate-300">{r.details}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
