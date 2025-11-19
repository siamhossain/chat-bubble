'use client';
import { useState } from 'react';
import ChatBubble from './components/ChatBubble';
import ChatWindow from './components/ChatWindow';

export default function Page() {
  const [open, setOpen] = useState(false);
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-4">AI Chat Bubble Demo</h1>
      <p className="mb-8">Click the bubble to start chatting with AI.</p>
      {open && <ChatWindow onClose={() => setOpen(false)} />}
      <ChatBubble onOpen={() => setOpen(true)} />
    </main>
  );
}
