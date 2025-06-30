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
import { CouponList } from "@/components/home";

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
                  Tổng:{" "}
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
                </p>
                <Button>Đặt hàng</Button>
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
                  </div>
                  <Button className="w-full py-6 font-bold text-md">
                    Đặt hàng
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
