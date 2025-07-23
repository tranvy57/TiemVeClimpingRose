// app/components/ChatBot.tsx
"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/utils/libs";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const chatId = "chat-123";
  const userId = "user-abc";

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input } as const;
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: data.reply } as const,
    ]);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        user_input: input,
        user_id: userId,
      }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-white border rounded-xl shadow-lg flex flex-col">
          <div className="p-3 border-b flex justify-between items-center">
            <span className="font-semibold">🤖 ChatBot</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "px-3 py-2 rounded-lg max-w-[80%] text-sm",
                  msg.from === "user"
                    ? "bg-blue-100 self-end ml-auto"
                    : "bg-gray-100 self-start mr-auto"
                )}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-2 border-t flex items-center gap-2">
            <input
              className="flex-1 border rounded px-2 py-1 text-sm"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="text-blue-500">
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      )}
    </div>
  );
};

export default ChatBot;
