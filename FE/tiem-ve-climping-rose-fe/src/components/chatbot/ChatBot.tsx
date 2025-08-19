"use client";

import React, { useState } from "react";
import { BotIcon, Send, User, User2Icon, UserIcon } from "lucide-react";
import { cn } from "@/utils/libs";
import { chat } from "@/api/chatApi";
import ReactMarkdown from "react-markdown";
import MarkdownRenderer from "./PreviewImage";
import Image from "next/image";
import { IUser } from "@/types/implements";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([
    {
      from: "bot",
      text: "🌸 **Chào mừng bạn đến với Climping Rose!**\n\nMình là trợ lý ảo, sẵn sàng hỗ trợ bạn về tìm kiếm tranh phù hợp, thông tin cửa hàng hoặc bất kỳ câu hỏi nào.",
    }
  ]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatId = "chat-123";
  const user: IUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : {};

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input } as const;
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Bắt đầu hiệu ứng typing
    setIsBotTyping(true);

    const body = {
      chat_id: chatId,
      user_input: input,
      user_id: user.userId || "",
    };

    try {
      const response = await chat(body);
      const reply = response?.data?.result ?? "❓ Không có phản hồi từ bot.";

      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "❌ Lỗi khi gửi tin nhắn." },
      ]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {isOpen ? (
        <div className="w-full max-w-[24rem] h-[32rem] bg-white border rounded-xl shadow-lg flex flex-col">
          <div className="p-3 border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src="/avt.jpg"
                alt="logo"
                width={32} // tăng kích thước
                height={32}
                className="rounded-full object-cover border border-gray-300"
              />
              <span className="font-semibold text-base">
                Trợ lý Ảo Climping Rose
              </span>
            </div>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="flex-1 p-2 pt-4 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${
                  msg.from === "bot" ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {msg.from === "bot" ? (
                  <Image
                    src="/avt.jpg"
                    alt="logo"
                    width={32}
                    height={32}
                    className="rounded-full object-cover border-1 border-gray-300 inline mr-1"
                  />
                ) : user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="avatar"
                    width={32}
                    height={32}
                    className="rounded-full object-cover border-1 border-gray-300 inline mr-1"
                  />
                ) : (
                  <UserIcon
                    size={24}
                    className="inline mr-1 rounded-full border-1 p-1"
                  />
                )}
                <div
                  className={cn(
                    "px-3 py-2 rounded-lg max-w-[80%] text-sm whitespace-pre-wrap",
                    msg.from === "user"
                      ? "bg-blue-100 self-end ml-auto"
                      : "bg-gray-100 self-start mr-auto"
                  )}
                >
                  {/* Render Markdown content */}
                  <MarkdownRenderer text={msg.text} />
                </div>
              </div>
            ))}

            {isBotTyping && (
              <div>
                <Image
                  src="/avt.jpg"
                  alt="logo"
                  width={32} // tăng kích thước
                  height={32}
                  className="rounded-full object-cover border-1 border-gray-300 inline mr-1"
                />
                <span className="px-3 py-2 rounded-lg bg-gray-100 text-sm animate-pulse w-fit">
                  Bot đang nhập...
                </span>
              </div>
            )}
          </div>

          <div className="p-3 border-t flex items-center gap-2 bg-gray-50">
            <div className="flex-1 flex items-center bg-white border border-gray-300 rounded-full px-3 shadow-sm focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
              <input
                className="flex-1 bg-transparent outline-none text-sm py-2"
                placeholder="Nhập tin nhắn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="text-blue-500 hover:text-blue-600 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          🤖
        </button>
      )}
    </div>
  );
};

export default ChatBot;
