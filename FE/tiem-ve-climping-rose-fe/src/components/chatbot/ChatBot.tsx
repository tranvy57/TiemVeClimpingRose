"use client";

import React, { useEffect, useRef, useState } from "react";
import { BotIcon, Send, User, User2Icon, UserIcon } from "lucide-react";
import { cn } from "@/utils/libs";
import { chat, getChatHistory, IChatHistory } from "@/api/chatApi";
import ReactMarkdown from "react-markdown";
import MarkdownRenderer from "./PreviewImage";
import Image from "next/image";
import { IUser } from "@/types/implements";

const suffix = `
  ✨ Nếu bạn cần hỗ trợ tốt hơn có thể nhấn vào trang bên dưới để ghé thăm chúng mình nhé:
  📘 [**Facebook**: Tiệm vẽ Climping Rose](https://www.facebook.com/tiemveclimpingrose)
  🎨 [**TikTok**: Tiệm tranh số hóa tại Nhật](https://www.tiktok.com/@tiemtranhsohoatainhat)
  📍 Japan

  💖 Cảm ơn bạn đã quan tâm đến **🌸 Climping Rose**!
`;

const ChatAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [isTop, setIsTop] = useState(false);
  const [messages, setMessages] = useState<IChatHistory[]>([
    {
      role: "AI",
      content:
        "🌸 **Chào mừng bạn đến với Climping Rose!**\n\nMình là trợ lý ảo, sẵn sàng hỗ trợ bạn về tìm kiếm tranh phù hợp, thông tin cửa hàng hoặc bất kỳ câu hỏi nào.",
    },
    {
      role: "AI",
      content:
        "Bạn có thể click vào [**đăng nhập**](https://climpingrose.com/login) nếu muốn lưu lại lịch sử trò chuyện.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const chatId = "chat-123";
  const user: IUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : {};

  const getChat = async () => {
    try {
      const history = await getChatHistory(0, 5);
      setMessages(history.data?.reverse() || []);

      // scroll sau khi setMessages
      if (isOpen && lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "instant" });
      }
    } catch (err) {
      // console.error("Failed to load chat history", err);
      // setMessages([]);
    }
  };

  const loadMore = async () => {
    const history = await getChatHistory(page + 1, 5); // lấy page tiếp theo
    if (history.data) {
      setMessages((prev) => [...(history.data || []), ...prev]); // prepend vào đầu
      setPage((p) => p + 1);
    }
  };

  useEffect(() => {
    getChat();
  }, [isOpen]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length > 0 && !isTop) {
      const el = containerRef.current;
      if (el) {
        requestAnimationFrame(() => {
          el.scrollTop = el.scrollHeight - el.clientHeight;
        });
      }
    }
  }, [isOpen, messages]);


  // useEffect(() => {
  //   if (isOpen && lastMessageRef.current) {
  //     lastMessageRef.current.scrollIntoView({ behavior: "instant" });
  //   }
  // }, [isOpen, messages]);

  useEffect(() => {
    setIsTop(true);
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (el.scrollTop === 0) {
        loadMore().then(() => {
          requestAnimationFrame(() => {
            el.scrollTop = 10;
          });
        });
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [page, messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "USER", content: input } as const;
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
      const reply = response?.data?.result ?? "❓ Không có phản hồi từ AI.";

      setMessages((prev) => [...prev, { role: "AI", content: reply }, { role: "AI", content: suffix }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "AI", content: "❌ Lỗi khi gửi tin nhắn." },
      ]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div className="fixed bottom-20 bg-white rounded-full right-4 z-50 ]">
      {isOpen ? (
        <div className="max-w-[24rem] w-[24rem] h-[32rem] bg-white border rounded-xl shadow-lg flex flex-col">
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

          <div
            ref={containerRef}
            className="flex-1 p-2 pt-4 overflow-y-auto space-y-2 scroll-smooth"
          >
            {messages.map((msg, i) => {
              const isLast = i === messages.length - 1;
              return (
                <div
                  key={i}
                  ref={isLast ? lastMessageRef : null}
                  className={`flex items-start gap-2 ${
                    msg.role === "AI" ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {msg.role === "AI" ? (
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
                      msg.role === "USER"
                        ? "bg-blue-100 self-end ml-auto"
                        : "bg-gray-100 self-start mr-auto"
                    )}
                  >
                    {/* Render Markdown content */}
                    <MarkdownRenderer text={msg.content} />
                  </div>
                </div>
              );
            })}

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
                  Bot đang suy nghĩ...
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

export default ChatAI;
