import Image from "next/image";
import Link from "next/link";
import { title } from "process";
import React from "react";

interface CategoryItemProps {
  title: string;
  description: string;
  image_url: string;
  href: string;
}

export function CategoryItem({
  title,
  description,
  image_url,
  href,
}: CategoryItemProps) {
  return (
    <Link href={href} className="">
      <div className="border border-gray-200 rounded-md h-full">
        <div className="relative aspect-square w-full overflow-hidden group min-w-[100px]">
          <Image
            src={image_url}
            alt={title}
            fill
            sizes="(max-width: 200px) 100vw, (min-width: 200px) 100vw"
            className="object-cover rounded-sm transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h3 className="md:text-md font-semibold text-red-500 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-1 font-normal">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
