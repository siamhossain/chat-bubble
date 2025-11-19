'use client';
export default function ChatBubble({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      aria-label="Open Chat"
    >
      💬
    </button>
  );
}
