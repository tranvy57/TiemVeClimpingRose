"use client";

import { getOrderById } from "@/api/orderApi";
import OrderItem from "@/components/orders/OrderItem";
import { showError } from "@/libs/toast";
import { IOrder } from "@/types/implements/order";
import React, { useEffect, useState } from "react";

interface CheckoutSuccesProp {
  orderId: string;
}

const CheckoutSuccesPage = ({ orderId }: CheckoutSuccesProp) => {
  const [order, setOrder] = useState<IOrder | null>(null);

  const fetchOrder = async () => {
    try {
      const response = await getOrderById(orderId);
      setOrder(response.data);
    } catch (error) {
      showError("Lỗi khi lấy thông tin đơn hàng");
    }
  };
  useEffect(() => {
    fetchOrder();
  });
  return (
    <div>
      <p className="text-xl text-red-400 font-semibold">Đặt hàng thành công</p>
      {order?.orderItems.map((item) => {
        return (
          <OrderItem
            key={item.orderItemId}
            paintingId={item.painting.paintingId}
            name={item.painting.name}
            price={item.currentPrice}
            size={item.painting.size}
            quantity={item.quantity}
            imageUrl={item.painting.imageUrl}
          />
        );
      })}
      <p className="">Mã đơn hàng: {orderId}</p>
    </div>
  );
};

export default CheckoutSuccesPage;
