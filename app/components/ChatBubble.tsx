'use client';

export default function ChatBubble({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="
        fixed bottom-6 right-6
        w-16 h-16
        bg-gradient-to-br from-purple-600 to-indigo-500
        text-white
        rounded-full
        shadow-xl
        flex items-center justify-center
        hover:scale-110
        hover:shadow-2xl
        transition-transform duration-200 ease-out
      "
      aria-label="Open Chat"
    >
      💬
    </button>
  );
}
