"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { showLoginWarning, showSuccess } from "@/libs/toast";
import QuantitySelector from "./QuantitySelector";
import { useAppSelector } from "@/hooks/store-hook";
import { caddCartItem } from "@/api/cartApi";
import { toast } from "sonner";

interface AddToCartSectionProps {
  paintingId: string;
  stock: number;
}

export default function AddToCartSection({
  paintingId,
  stock,
}: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const authenticated = useAppSelector((state) => state.auth.authenticated);

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
    <div className="flex items-center gap-4 mt-6">
      <QuantitySelector max={stock} onChange={setQuantity} />

      <Button
        onClick={() => handleAddCartItem(paintingId, quantity)}
        className="flex items-center gap-2"
      >
        <ShoppingCart className="w-4 h-4" />
        Thêm vào giỏ
      </Button>
    </div>
  );
}
