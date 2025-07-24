"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { showLoginWarning, showSuccess } from "@/libs/toast";
import QuantitySelector from "./QuantitySelector";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { caddCartItem } from "@/api/cartApi";
import { toast } from "sonner";
import { setCheckoutData } from "@/store/slice/checkout-slice";
import { calculateDeliveryCost } from "@/utils/orderUltils";
import { ICartItem } from "@/types/implements/cart-item";
import { useRouter } from "next/navigation";

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
  const [selectedCartItems, setSelectedCartItems] = useState<ICartItem[]>([]);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!authenticated) {
      showLoginWarning();
      return;
    }

    try {
      const response = await caddCartItem({ paintingId, quantity });

      if (!response.data) {
        toast.error("Không thể thêm vào giỏ hàng.");
        return;
      }

      const newCartItems = [...selectedCartItems, response.data];

      const totalPaintingsPrice = newCartItems.reduce(
        (sum, item) => sum + item.painting.price * item.quantity,
        0
      );

      const paintingMap = Object.fromEntries(
        newCartItems.map((item) => [item.painting.paintingId, item.painting])
      );

      const deliveryCost = calculateDeliveryCost(
        newCartItems.map((item) => ({
          paintingId: item.painting.paintingId,
          quantity: item.quantity,
        })),
        paintingMap,
        "tokyo"
      );

      // Cập nhật Redux
      dispatch(
        setCheckoutData({
          selectedCartItems: newCartItems,
          totalPaintingsPrice,
          deliveryCost,
          couponCode: "",
          discount: 0,
          totalPrice: totalPaintingsPrice + deliveryCost,
        })
      );

      // Chuyển trang
      router.push("/checkout");
    } catch (error) {
      console.error("Error checkout:", error);
      toast.error("Không thể thực hiện thanh toán. Vui lòng thử lại.");
    }
  };

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
    <div className="flex gap-4 mt-6 items-between">
      <QuantitySelector max={stock} onChange={setQuantity} />

      <div className="flex gap-1">
        <Button
          onClick={() => handleAddCartItem(paintingId, quantity)}
          className="flex items-center gap-2"
        >
          <ShoppingCart className="w-4 h-4 font-bold" />
        </Button>

        <Button onClick={handleCheckout}>Mua ngay</Button>
      </div>
    </div>
  );
}
