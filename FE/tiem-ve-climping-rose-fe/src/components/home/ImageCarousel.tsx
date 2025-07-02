"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  { src: "/banners/banner1.png", alt: "Banner 1" },
  { src: "/banners/banner2.png", alt: "Banner 2" },
  { src: "/banners/banner3.png", alt: "Banner 3" },
];

export function ImageCarousel() {
  return (
    <div className="w-full max-w-7xl mx-auto relative rounded-2xl overflow-hidden shadow-sm">
      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop
        slidesPerView={1}
        className="w-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[100px] sm:h-[200px] md:h-[250px] ">
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Nút điều hướng */}
      <div className="swiper-button-prev hidden sm:flex absolute inset-y-0 my-auto left-3 z-10 bg-white/60 w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-full shadow-lg hover:bg-white/80 hover:scale-110 transition duration-300 cursor-pointer">
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
      </div>

      <div className="swiper-button-next hidden sm:flex absolute inset-y-0 my-auto right-3 z-10 bg-white/60 w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-full shadow-lg hover:bg-white/80 hover:scale-110 transition duration-300 cursor-pointer">
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
      </div>
    </div>
  );
}
