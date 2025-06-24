import Image from "next/image";
import Link from "next/link";
import React from "react";

interface OptionItemProps {
  name: string;
  image_url: string;
}

export function OptionItem({ name, image_url }: OptionItemProps) {
  return (
    <div
      className="group w-[100px] md:w-[180px] flex-shrink-0 lg:mx-10 md:mx-3"
      tabIndex={0}
      role="button"
    >
      <div className="relative aspect-square w-full">
        <Image
          src={image_url}
          fill
          alt="Kích thước"
          className="object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="font-bold text-red-500 text-center text-sm md:text-md p-4">
        {name}
      </p>
    </div>
  );
}
