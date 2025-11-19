'use client';
export default function Message({ m }) {
  return (
    <div className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] p-2 rounded-lg ${m.from === 'user' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
        <div className="whitespace-pre-wrap">{m.text}</div>
        <div className="text-xs opacity-60 mt-1 text-right">{m.time}</div>
      </div>
    </div>
  );
}
