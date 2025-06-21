"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { showSuccess } from "@/libs/toast";
import QuantitySelector from "./QuantitySelector";

interface AddToCartSectionProps {
  paintingId: string;
  stock: number;
}

export default function AddToCartSection({
  paintingId,
  stock,
}: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // 🛒 1. Bạn có thể gửi đến BE
    // await axios.post("/cart", { paintingId, quantity })

    // 🧠 2. Hoặc lưu vào localStorage (tạm thời)
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingIndex = cart.findIndex(
      (item: any) => item.paintingId === paintingId
    );
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ paintingId, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    showSuccess("Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="flex items-center gap-4 mt-6">
      <QuantitySelector max={stock} onChange={setQuantity} />

      <Button onClick={handleAddToCart} className="flex items-center gap-2">
        <ShoppingCart className="w-4 h-4" />
        Thêm vào giỏ
      </Button>
    </div>
  );
}
