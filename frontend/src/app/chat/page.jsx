'use client';

import { useState } from 'react';
import Nav from '../../components/Nav';
import { api } from '../../lib/api';

export default function Chat() {
  const [output, setOutput] = useState('');

  async function runAgent() {
    const res = await api('/agent/run-cycle', { method: 'POST', body: JSON.stringify({}) });
    setOutput(JSON.stringify(res, null, 2));
  }

  return (
    <>
      <h2>AI Coach Chat</h2>
      <Nav />
      <button onClick={runAgent}>Run autonomous cycle</button>
      <pre>{output}</pre>
    </>
  );
}
