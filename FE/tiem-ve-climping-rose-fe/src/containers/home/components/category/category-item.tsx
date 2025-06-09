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

const CategoryItem = ({
  title,
  description,
  image_url,
  href,
}: CategoryItemProps) => {
  return (
    <Link
      href={href}
      className="rounded-md border border-gray-200 overflow-hidden group"
    >
      <div className="relative aspect-square w-full">
        <Image
          src={image_url}
          alt={title}
          fill
          className="object-cover rounded-sm transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-nor text-red-500 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mt-1 font-normal">{description}</p>
      </div>
    </Link>
  );
};

export default CategoryItem;
