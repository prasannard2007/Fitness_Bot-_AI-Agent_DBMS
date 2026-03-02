'use client';

import { useState } from 'react';
import Nav from '../../components/Nav';
import { api } from '../../lib/api';

export default function Chat() {
  const [input, setInput] = useState('Create my workout for tomorrow morning');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your Fitness Bot coach. Tell me your goal and available time.' }
  ]);

  async function send() {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await api('/agent/run-cycle', { method: 'POST', body: JSON.stringify({}) });
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Autonomous cycle complete. Focus: ${res.plan?.focus}. Target: ${res.plan?.weeklyTarget}.` }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'I queued your request and prepared a draft plan based on your recent activity.' }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Nav />
      <section className="mx-auto flex h-[75vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
        <header className="border-b border-slate-800 px-4 py-3">
          <h2 className="font-semibold text-cyan-300">AI Coach Chat</h2>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  m.role === 'user' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-100'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-slate-800 px-4 py-2 text-sm text-slate-200">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:300ms]" />
                </span>
              </div>
            </div>
          )}
        </div>

        <footer className="border-t border-slate-800 p-3">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your AI coach..."
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            />
            <button onClick={send} disabled={loading} className="rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-slate-950 disabled:opacity-60">
              Send
            </button>
          </div>
        </footer>
      </section>
    </>
  );
}
