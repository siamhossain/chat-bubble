export function ChatBubble({ text }: { text: string }) {
  return (
    <div className="bg-blue-500 text-white p-3 rounded-xl max-w-xs my-2">
      {text}
    </div>
  );
}