'use client';
import { useState, useRef, useEffect } from 'react';
import Message from './Message';
import { v4 as uuidv4 } from 'uuid';

export default function ChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <div className="fixed bottom-20 right-6 w-80 h-96 bg-[#1A1C22] shadow-2xl rounded-xl p-3 flex flex-col text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-lg text-white">SupportBot</div>
        <button 
          onClick={onClose} 
          className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-200 transition"
        >
          Close
        </button>
      </div>

      {/* Message area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 p-1">
        {messages.map(m => <Message key={m.id} m={m} />)}
      </div>

      {/* Input */}
      <div className="mt-2 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') send(); }}
          placeholder="Ask something..."
          className="flex-1 bg-[#2A2C33] placeholder-gray-400 text-gray-100 border-none p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button 
          disabled={loading} 
          onClick={send} 
          className="bg-gradient-to-br from-purple-600 to-indigo-500 text-white px-4 rounded-lg hover:scale-105 transition-transform"
        >
          Send
        </button>
      </div>
    </div>
  );
}
