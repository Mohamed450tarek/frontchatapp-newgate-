import { useState } from "react";
import { useChatStore } from "../store/useChatStore";

function MessageInput() {
  const [text, setText] = useState("");
  const { sendMessage, selectedUser } = useChatStore();

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage({ text });
    setText("");
  };

  if (!selectedUser) return null;

  return (
    <div className="p-4 flex gap-2 border-t border-slate-700">
      <input
        className="input w-full bg-slate-900 text-white"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />

      <button onClick={handleSend} className="btn btn-info">
        Send
      </button>
    </div>
  );
}

export default MessageInput;
