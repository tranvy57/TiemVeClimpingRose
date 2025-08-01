"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function CopyIcon() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      toast.success("Đã sao chép liên kết!");
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className=" rounded-lg hover:bg-gray-200 transition"
      title="Sao chép liên kết"
    >
      {copied ? (
        <div className="flex items-center gap-2">
          <Check size={20} className="text-green-600 text-sm underline" />
          <p className="h-full">Sao chép liên kết</p>
        </div>
      ) : (
        <div className="flex items-center gap-2  text-sm underline">
          <Copy size={20} />
          <p className="h-full">Sao chép liên kết</p>
        </div>
      )}
    </button>
  );
}
