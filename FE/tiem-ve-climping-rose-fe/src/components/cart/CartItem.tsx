"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IPainting } from "@/types/implements/painting";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { deleteCartItem } from "@/api/cartApi";
import { on } from "events";

interface CartItemProps {
  cartItemId: string;
  painting: IPainting;
  quantity: number;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const CartItem = ({
  cartItemId,
  painting,
  quantity,
  onDelete,
  isSelected,
  onToggle,
}: CartItemProps) => {
  const [count, setCount] = useState(quantity);

  const handleDecrease = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDelete = () => {
    onDelete(cartItemId);
  };

  return (
    <div className="relative w-full overflow-hidden group border-b py-2">
      {/* Nội dung chính */}
      <div className="flex w-full 0">
        {/* Checkbox  */}
        <div className="flex-shrink-0 px-2 flex items-center">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onToggle(cartItemId)}
          />
        </div>

        {/* Ảnh sản phẩm */}
        <div className="w-20 h-20 relative flex-shrink-0">
          <Image
            src={painting.imageUrl || "/placeholder.png"}
            alt={painting.name}
            fill
            className="object-cover rounded-md"
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex-1 px-3 flex flex-col justify-between text-sm">
          <div>
            <p className="font-medium text-gray-800 line-clamp-2">
              {painting.name}
            </p>
            {painting.size && (
              <p className="text-gray-500 text-xs mt-1">
                Kích thước: {painting.size}
              </p>
            )}
          </div>

          {/* Giá và số lượng */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <p className="text-red-500 font-semibold">
                ¥{painting.price.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                disabled={quantity <= 1}
                className="h-7 w-7 rounded-md bg-red-400 hover:bg-red-500"
              >
                <Minus className="w-4 h-4 text-white " />
              </Button>

              <Input
                type="number"
                value={quantity}
                min={1}
                className="w-12 text-center border rounded-md text-sm py-1"
              />

              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-md bg-red-400 hover:bg-red-500"
              >
                <Plus className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>
        </div>
        <div className=" flex items-start justify-center">
          <Button onClick={handleDelete} className="bg-transparent">
            <Trash2 className="w-5 h-5 text-gray-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
