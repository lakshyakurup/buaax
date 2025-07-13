'use client';
import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages([...messages, { user: input, bot: data.reply }]);
    setInput('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-white p-4">
      <div className="flex-grow space-y-3 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i}>
            <p><strong>You:</strong> {m.user}</p>
            <p><strong>Baux:</strong> {m.bot}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <input
          className="flex-grow rounded p-2 bg-zinc-200 dark:bg-zinc-800"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Hey, how can I help you today?"
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
  );
}
