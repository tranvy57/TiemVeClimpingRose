import { showSuccess } from "@/libs/toast";
import { Check, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
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
      className="rounded-md border border-gray-200 overflow-hidden group "
    >
      <div className="relative aspect-square w-full overflow-hidden ">
        <Image
          src={image_url}
          alt={name}
          fill
          className="object-cover rounded-sm transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-2 flex items-center justify-between">
        <div>
          <p className=" text-sm font-semibold text-red-400 transition-colors">
            {name}
          </p>
          <p className="text- text-gray-600 font-light"> {price}¥</p>
        </div>

        <div className="bg-red-100 rounded-full p-1 hover:p-2 transition-all duration-300">
          <ShoppingCart
            className="font-light text-red-400 size-4
          "
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              showSuccess("Đã thêm vào giỏ hàng!");
            }}
          />
        </div>
      </div>
    </Link>
  );
}
