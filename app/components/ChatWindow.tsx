'use client';
import { useState, useRef, useEffect } from 'react';
import Message from './Message';
import { v4 as uuidv4 } from 'uuid';

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  function timestamp() {
    return new Date().toLocaleTimeString();
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  async function send() {
    if (!input.trim()) return;
    const userMsg = { id: uuidv4(), from: 'user', text: input, time: timestamp() };
    setMessages(p => [...p, userMsg]);
    const toSend = input;
    setInput('');
    setLoading(true);

    const botId = uuidv4();
    setMessages(p => [...p, { id: botId, from: 'bot', text: '', time: timestamp() }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: toSend }], stream: false })
      });
      const data = await res.json();
      setMessages(p => p.map(m => m.id === botId ? { ...m, text: data.reply } : m));
    } catch {
      setMessages(p => p.map(m => m.id === botId ? { ...m, text: 'Error fetching response' } : m));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-xl rounded-xl p-3 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">SupportBot</div>
        <button onClick={onClose} className="text-xs px-2 py-1 bg-gray-100 rounded">Close</button>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 p-1">
        {messages.map(m => <Message key={m.id} m={m} />)}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') send(); }}
          className="flex-1 border p-2 rounded-lg"
          placeholder="Ask something..."
        />
        <button disabled={loading} onClick={send} className="bg-black text-white px-3 rounded-lg">Send</button>
      </div>
    </div>
  );
}
