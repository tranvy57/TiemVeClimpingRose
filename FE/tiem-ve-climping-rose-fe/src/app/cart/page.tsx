"use client";

import { deleteCartItem, getCart, updateCartItem } from "@/api/cartApi";
import CartItem from "@/components/cart/CartItem";
import { Button } from "@/components/ui/button";
import PinkSpinner from "@/components/ui/pink-spiner";
import { useAppSelector } from "@/hooks/store-hook";
import api from "@/libs/axios-config";
import { showError, showLoginWarning } from "@/libs/toast";
import { ICartItem } from "@/types/implements/cart-item";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight, Ticket } from "lucide-react";
import { CouponList } from "@/components/home";
import Link from "next/link";

const Cart = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const fetchCartItems = async () => {
    try {
      const response = await getCart();
      if (response.data) {
        setCartItems(response.data);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      showError("Không thể tải giỏ hàng. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleItem = (cartItemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(cartItemId)
        ? prev.filter((id) => id !== cartItemId)
        : [...prev, cartItemId]
    );
  };

  const handleUpdateQuantity = async (cartItemId: string, quantity: number) => {
    try {
      const response = await updateCartItem({
        cartItemId,
        quantity,
      });

      if (response.data) {
        setCartItems((prev) =>
          (prev ?? []).map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          )
        );
      }
    } catch (error) {
      showError(
        error instanceof Error ? error.message : "Cập nhật số lượng thất bại"
      );
    }
  };

  const handleDeleteItem = async (cartItemId: string) => {
    try {
      await deleteCartItem(cartItemId);
      // Cập nhật lại danh sách sau khi xóa
      setCartItems((prev) =>
        (prev ?? []).filter((item) => item.cartItemId !== cartItemId)
      );
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const totalPrice =
    cartItems
      ?.filter((item) => selectedItems.includes(item.cartItemId))
      .reduce(
        (total, item) => total + item.painting.price * item.quantity,
        0
      ) ?? 0;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      showLoginWarning();
      return;
    }
    fetchCartItems();
  }, []);

  return (
    <div className=" pb-[90px]  ">
      {cartItems ? (
        <div className="flex flex-col gap-10">
          {cartItems.length > 0 ? (
            <div className="flex gap-4">
              <div className="flex-1 ">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.cartItemId}
                    cartItemId={item.cartItemId}
                    painting={item.painting}
                    quantity={item.quantity}
                    onDelete={handleDeleteItem}
                    isSelected={selectedItems.includes(item.cartItemId)}
                    onToggle={handleToggleItem}
                    handleUpdateQuantity={handleUpdateQuantity}
                  />
                ))}
              </div>

              <div className="hidden border pl-4 p-4 min-w-[200px] w-[25%] md:flex flex-col gap-4">
                <p className="text-red-500 text-xl font-semibold">
                  Thông tin đơn hàng:
                </p>
                <p>
                  Tổng số sản phẩm:{" "}
                  <span className="font-semibold">{cartItems.length}</span>
                </p>
                <Dialog>
                  <DialogTrigger>
                    <div className="flex justify-between items-center gap-2 cursor-pointer">
                      <p>Xem mã giảm giá </p>
                      <ChevronRight className="float-right" />
                    </div>{" "}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Chưa làm</DialogTitle>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <p className=" text-gray-800 font-semibold">
                  Tổng: ¥{totalPrice.toLocaleString("ja-JP")}
                </p>
                <Button>
                  <Link href="/checkout">Đặt hàng</Link>
                </Button>
              </div>

              {/* mobile */}
              <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t z-50 px-4 py-3 shadow-md gap-2 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ticket className="text-red-400" />
                    <p>Mã giảm giá:</p>
                  </div>
                  <Dialog>
                    <DialogTrigger>
                      <div className="flex items-center gap-2 cursor-pointer">
                        Xem mã giảm giá <ChevronRight />
                      </div>{" "}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Chưa làm</DialogTitle>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
                <p>
                  Tổng số sản phẩm:{" "}
                  <span className="font-semibold">{cartItems.length}</span>
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xl text-gray-700">
                      Tổng: ¥{totalPrice.toLocaleString("ja-JP")}
                    </p>
                  </div>
                  <Button className="w-full py-6 font-bold text-md">
                    <Link href="/checkout">Đặt hàng</Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center px-4">
              <Image
                src="/cart-empty.png"
                alt="Empty Cart"
                width={800}
                height={500}
                className="w-full h-auto object-contain"
              />
              <p className="text-lg text-gray-600 mt-4 text-center">
                Oops! Bạn chưa có sản phẩm nào trong giỏ hàng.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>{isLoading && <PinkSpinner />}</div>
      )}
    </div>
  );
};

export default Cart;
