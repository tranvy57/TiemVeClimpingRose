"use client";

import Image from "next/image";
import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const FeedbacksPage = () => {
  const images = [
    "/feedbacks/fb4.jpg",
    "/feedbacks/fb1.jpg",
    "/feedbacks/fb2.jpg",
    "/feedbacks/fb3.jpg",
    "/feedbacks/fb11.jpg",
    "/feedbacks/fb12.jpg",
    "/feedbacks/fb13.jpg",
    "/feedbacks/fb5.jpg",
    "/feedbacks/fb6.jpg",
    "/feedbacks/fb7.jpg",
    "/feedbacks/fb8.jpg",
    "/feedbacks/fb10.jpg",
  ];

  return (
    <div className="p-4 space-y-4">
      <p className="text-center text-lg font-semibold">
        Một vài feedbacks từ khách của Tiệm: 💋💞😘😍
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <Zoom key={idx}>
            <Image
              src={img}
              alt={`feedback ${idx}`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-lg shadow-md cursor-zoom-in"
            />
          </Zoom>
        ))}
      </div>
    </div>
  );
};

export default FeedbacksPage;
