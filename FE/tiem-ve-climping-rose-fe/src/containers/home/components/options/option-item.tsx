import Image from "next/image";
import Link from "next/link";
import React from "react";

interface OptionItemProps {
  name: string;
  image_url: string;
  href: string;
}

const OptionItem = ({ name, image_url, href }: OptionItemProps) => {
  return (
    <Link href={href} className="group">
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
    </Link>
  );
};

export default OptionItem;
