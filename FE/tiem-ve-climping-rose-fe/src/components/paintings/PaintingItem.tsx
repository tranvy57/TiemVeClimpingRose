import { caddCartItem } from "@/api/cartApi";
import { useAppSelector } from "@/hooks/store-hook";
import { showLoginWarning, showSuccess } from "@/libs/toast";
import { BadgeJapaneseYen, Check, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
interface PaitingItemProps {
  paintingId: string;
  name: string;
  image_url: string;
  price: number;
  href: string;
  size: string;
}

export function PaitingItem({
  paintingId,
  name,
  image_url,
  price,
  href,
  size,
}: PaitingItemProps) {
  const { authenticated } = useAppSelector((state) => state.auth);
  // Handle adding item to cart
  const handleAddCartItem = async (id: string, quantity: number) => {
    if (!authenticated) {
      showLoginWarning();
      return;
    }
    try {
      // Call API to add item to cart
      const response = await caddCartItem({ paintingId: id, quantity });
      if (response.data) {
        showSuccess("Đã thêm vào giỏ hàng!");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Không thể thêm vào giỏ hàng. Vui lòng thử lại sau.");
    }
  };
  return (
    <Link
      href={href}
      className="rounded-md border border-gray-200 overflow-hidden group "
    >
      <div className="relative aspect-square w-full min-w-[100px] overflow-hidden ">
        <Image
          src={image_url}
          alt={name}
          fill
          className="object-cover rounded-sm transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-2 md:p-3">
        <div className="h-fit">
          <p className="truncate whitespace-nowrap overflow-hidden text-sm font-semibold">
            {name}
          </p>

          <p className="font-light text-[10px]">{size}</p>
        </div>

        <div className="text-md text-red-500 font-bold flex justify-between">
          <div className="flex items-center">
            {/* <BadgeJapaneseYen
              className="size-4"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            /> */}
            ¥{price.toLocaleString("ja-JP")}
          </div>

          <div className="bg-red-400 rounded-full p-1 hover:p-2 transition-all duration-300 shadow-sm ">
            <ShoppingCart
              className="font-light size-4 text-white cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddCartItem(paintingId, 1);
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
