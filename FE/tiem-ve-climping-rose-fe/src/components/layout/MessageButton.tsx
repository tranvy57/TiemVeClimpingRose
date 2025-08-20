"use client";

import Image from "next/image";

export default function MessengerButton() {
  return (
    <a
      href="https://m.me/tiemveclimpingrose"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 bg-white rounded-full right-4 z-50"
    >
      <div className=" p-3 rounded-full shadow-lg hover:scale-105 transition-transform">
        <div className="relative w-6 h-6">
          <Image
            src="/mess.svg"
            alt="Messenger Icon"
            fill
            sizes="24px"
            className="object-contain"
          />
        </div>
      </div>
    </a>
  );
}
