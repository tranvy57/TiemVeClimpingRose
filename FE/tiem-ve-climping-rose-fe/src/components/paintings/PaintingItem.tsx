import Image from "next/image";
import Link from "next/link";

interface PaitingItemProps {
  name: string;
  image_url: string;
  price: number;
  href: string;
}

export function PaitingItem({
  name,
  image_url,
  price,
  href,
}: PaitingItemProps) {
  return (
    <Link
      href={href}
      className="rounded-md border border-gray-200 overflow-hidden group bg-red-200 md:mw-[100px]"
    >
      <div className="relative aspect-square w-full ">
        <Image
          src={image_url}
          alt={name}
          fill
          className="object-cover rounded-sm transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h3 className="md:text-md font-semibold text-red-500 transition-colors">
          {name}
        </h3>
      </div>
    </Link>
  );
}
