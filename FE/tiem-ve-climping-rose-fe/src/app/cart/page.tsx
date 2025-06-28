"use client";

import { getCart } from "@/api/cartApi";
import CartItem from "@/components/cart/CartItem";
import { Button } from "@/components/ui/button";
import PinkSpinner from "@/components/ui/pink-spiner";
import { useAppSelector } from "@/hooks/store-hook";
import api from "@/libs/axios-config";
import { showError, showLoginWarning } from "@/libs/toast";
import { ICartItem } from "@/types/implements/cart-item";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

const Cart = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      showLoginWarning("/login");
      return;
    }
    fetchCartItems();
  }, []);

  return (
    <div className="min-h-100 pb-[90px]">
      {cartItems ? (
        <>
          {cartItems.length > 0 ? (
            <div className="flex gap-4">
              <div className="flex-1 space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.cartItemId}
                    cartItemId={item.cartItemId}
                    painting={item.painting}
                    quantity={item.quantity}
                  />
                ))}
              </div>
              <div className="hidden border pl-4 p-4 min-w-[300px] w-80 md:flex flex-col gap-4">
                <p className="text-lg text-gray-800 font-semibold">
                  Tổng số sản phẩm: {cartItems.length}
                </p>
                <p className="text-lg text-gray-800 font-semibold">
                  Tổng tiền:{" "}
                  {cartItems
                    .reduce(
                      (total, item) =>
                        total + item.painting.price * item.quantity,
                      0
                    )
                    .toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </p>
              </div>

              <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t z-50 px-4 py-3 shadow-md space-y-4">
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
                <div>
                  <div>
                    <p>
                      Tổng số sản phẩm:{" "}
                      <span className="font-semibold">{cartItems.length}</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xl text-gray-700">
                      Tổng:{" "}
                      <span className="font-semibold">
                        {cartItems
                          .reduce(
                            (total, item) =>
                              total + item.painting.price * item.quantity,
                            0
                          )
                          .toLocaleString("ja-JP", {
                            style: "currency",
                            currency: "JPY",
                          })}
                      </span>
                    </p>
                    <button className="bg-red-400 hover:bg-red-600 text-white py-3 px-6 rounded text-sm font-medium">
                      Đặt hàng
                    </button>
                  </div>
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
        </>
      ) : (
        <div>{isLoading && <PinkSpinner />}</div>
      )}
    </div>
  );
};

export default Cart;
