'use client';
import { useState } from 'react';
import ChatBubble from './components/ChatBubble';
import ChatWindow from './components/ChatWindow';

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B0C10] to-[#1F2026] text-gray-100 flex flex-col items-center justify-center p-8">
      {/* Hero Section */}
      <div className="max-w-xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
          AI Chat Interface
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mb-12 leading-relaxed">
          Start a conversation with your AI assistant.  
          Click the floating bubble to open the chat window.
        </p>
      </div>

      {/* Chat Window */}
      {open && <ChatWindow onClose={() => setOpen(false)} />}

      {/* Floating Chat Bubble */}
      <ChatBubble onOpen={() => setOpen(true)} />
    </main>
  );
}
