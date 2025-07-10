"use client";

import { deleteCartItem, getCart, updateCartItem } from "@/api/cartApi";
import CartItem from "@/components/cart/CartItem";
import { Button } from "@/components/ui/button";
import PinkSpinner from "@/components/ui/pink-spiner";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
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
import { CouponItem, CouponList } from "@/components/home";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCheckoutData } from "@/store/slice/checkout-slice";
import axios from "axios";
import { calculateDeliveryCost } from "@/utils/orderUltils";
import { ICoupon } from "@/types/implements/coupon";
import { getCoupons } from "@/api/couponAPi";

const Cart = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const fetchCoupons = async () => {
    try {
      const response = await getCoupons();
      setCoupons(response.data || []);
    } catch (error) {
      console.error("Error fetching Coupons:", error);
    } finally {
      setLoading(false);
    }
  };

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
      const response = await updateCartItem({ cartItemId, quantity });
      if (response.data) {
        setCartItems((prev) =>
          (prev ?? []).map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          )
        );
      }
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Cập nhật số lượng thất bại";
      showError(message);
      throw error; // ⬅ vẫn nên throw để component gọi có thể xử lý tiếp
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

  const handleCheckout = () => {
    if (!cartItems) return;

    const selectedCartItems = cartItems.filter((item) =>
      selectedItems.includes(item.cartItemId)
    );

    const totalPaintingsPrice = selectedCartItems.reduce(
      (sum, item) => sum + item.painting.price * item.quantity,
      0
    );

    const paintingMap = Object.fromEntries(
      selectedCartItems.map((item) => [item.painting.paintingId, item.painting])
    );

    const deliveryCost = calculateDeliveryCost(
      selectedCartItems.map((item) => ({
        paintingId: item.painting.paintingId,
        quantity: item.quantity,
      })),
      paintingMap,
      "tokyo"
    );

    dispatch(
      setCheckoutData({
        selectedCartItems,
        totalPaintingsPrice,
        deliveryCost,
        totalPrice: totalPaintingsPrice + deliveryCost,
      })
    );

    router.push("/checkout");
  };

  const totalPrice =
    cartItems
      ?.filter((item) => selectedItems.includes(item.cartItemId))
      .reduce(
        (total, item) => total + item.painting.price * item.quantity,
        0
      ) ?? 0;

  const estimatedDeliveryCost = (() => {
    if (!cartItems || selectedItems.length === 0) return 0;
    const selectedCartItems = cartItems.filter((item) =>
      selectedItems.includes(item.cartItemId)
    );
    const orderItems = selectedCartItems.map((item) => ({
      paintingId: item.painting.paintingId,
      quantity: item.quantity,
    }));
    const paintingMap = Object.fromEntries(
      selectedCartItems.map((item) => [item.painting.paintingId, item.painting])
    );
    return calculateDeliveryCost(orderItems, paintingMap, "tokyo");
  })();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      showLoginWarning();
      return;
    }
    fetchCartItems();
  }, []);

  useEffect(() => {
    fetchCoupons();
  });

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

              {/* Sidebar */}
              <div className="hidden border pl-4 p-4 min-w-[200px] w-[25%] md:flex flex-col gap-4">
                <p className="text-red-500 text-xl font-semibold">
                  Thông tin đơn hàng:
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer justify-between">
                      <p> Xem mã giảm giá</p>
                      <ChevronRight />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        <div className="flex gap-4 flex-col h-full justify-center items-center">
                          {coupons.map((c) => {
                            return (
                              <CouponItem
                                key={c.couponId}
                                imageUrl="/coupons/couponfreeship.png"
                                code={c.code}
                                discountPercentage={c.discountPercentage}
                                condition={c.condition}
                                description={c.description}
                              />
                            );
                          })}
                        </div>
                      </DialogTitle>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <p>
                  Tổng tiền tranh:{" "}
                  <span className="font-semibold">
                    {totalPrice.toLocaleString("ja-JP")}
                  </span>
                </p>

                <p>
                  Phí vận chuyển (ước lượng): ¥
                  {estimatedDeliveryCost.toLocaleString("ja-JP")}
                </p>

                <p className="text-gray-800 font-semibold">
                  Tổng: ¥
                  {(totalPrice + estimatedDeliveryCost).toLocaleString("ja-JP")}
                </p>

                <Button
                  className={`w-full py-6 font-bold text-md ${
                    selectedItems.length === 0
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                  disabled={selectedItems.length === 0}
                  onClick={handleCheckout}
                >
                  Đặt hàng
                </Button>
              </div>

              {/* mobile */}
              <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t z-50 px-4 py-3 shadow-md gap-2 flex flex-col">
                <div className="flex items-center justify-between h-full">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="flex w-full justify-between">
                        <div className="flex items-center gap-2">
                          <Ticket className="text-red-400" />
                          <p>Mã giảm giá:</p>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer float-end">
                          <ChevronRight />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          <div className="flex gap-4 flex-col py-4 items-center justify-center">
                            {coupons.map((c) => {
                              return (
                                <CouponItem
                                  key={c.couponId}
                                  imageUrl="/coupons/couponfreeship.png"
                                  code={c.code}
                                  discountPercentage={c.discountPercentage}
                                  condition={c.condition}
                                  description={c.description}
                                />
                              );
                            })}
                          </div>
                        </DialogTitle>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
                <p>
                  Tổng tiền tranh:{" "}
                  <span className="font-semibold">
                    {totalPrice.toLocaleString("ja-JP")}
                  </span>
                </p>
                <p>
                  Phí vận chuyển (ước lượng): ¥
                  {estimatedDeliveryCost.toLocaleString("ja-JP")}
                </p>
                <p className="font-semibold text-lg">
                  Tổng: ¥
                  {(totalPrice + estimatedDeliveryCost).toLocaleString("ja-JP")}
                </p>
                <Button
                  className={`w-full py-6 font-bold text-md ${
                    selectedItems.length === 0
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                  disabled={selectedItems.length === 0}
                  onClick={handleCheckout}
                >
                  Đặt hàng
                </Button>
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
