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
  handleUpdateQuantity?: (cartItemId: string, quantity: number) => void;
}

const CartItem = ({
  cartItemId,
  painting,
  quantity,
  onDelete,
  isSelected,
  onToggle,
  handleUpdateQuantity,
}: CartItemProps) => {
  const [count, setCount] = useState(quantity);

  const handleDecrease = () => {
    if (count > 1) setCount(count - 1);
    if (handleUpdateQuantity) {
      handleUpdateQuantity(cartItemId, count - 1);
    }
  };

  const handleIncrease = () => {
    setCount(count + 1);
    if (handleUpdateQuantity) {
      handleUpdateQuantity(cartItemId, count + 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const newQuantity = parseInt(input, 10);

    if (input === "") {
      setCount(0); // Cho phép người dùng xóa sạch input
      return;
    }

    if (!isNaN(newQuantity) && newQuantity > 0) {
      setCount(newQuantity);
      if (handleUpdateQuantity) {
        handleUpdateQuantity(cartItemId, newQuantity);
      }
    }
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
            <div className="flex items-center justify-between">
              <p
                className="font-medium text-gray-800 line-clamp-2 cursor-pointer hover:underline"
                onClick={() => {
                  window.location.href = `/paintings/${painting.paintingId}`;
                }}
              >
                {painting.name}
              </p>
              <Button onClick={handleDelete} className="bg-transparent">
                <Trash2 className="w-5 h-5 text-gray-500" />
              </Button>
            </div>
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

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                disabled={quantity <= 1}
                className="h-7 w-7 rounded-md bg-red-400 hover:bg-red-500"
                onClick={() => handleDecrease()}
              >
                <Minus className="w-4 h-4 text-white " />
              </Button>

              <Input
                type="number"
                value={count}
                min={1}
                className="w-15 text-center border rounded-md text-sm py-1"
                onChange={handleQuantityChange}
              />

              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-md bg-red-400 hover:bg-red-500"
                onClick={() => handleIncrease()}
              >
                <Plus className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
