"use client";

import { getOrderById } from "@/api/orderApi";
import OrderItem from "@/components/orders/OrderItem";
import { Button } from "@/components/ui/button";
import { showError } from "@/libs/toast";
import { IOrder } from "@/types/implements/order";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PaymentPagePage = () => {
  const [order, setOrder] = useState<IOrder | null>(null);
  const searchParams = useSearchParams();

  const fetchOrder = async () => {
    try {
      const orderId = searchParams.get("orderId");
      if (!orderId) {
        return;
      }
      const response = await getOrderById(orderId);
      setOrder(response.data);
    } catch (error) {
      showError("Lỗi khi lấy thông tin data");
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <div>
      {order && (
        <div className="space-y-2">
          <p className="font-semibold">Đơn hàng của bạn:</p>
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

          <p>Người nhận: {order?.receiverName}</p>
          <p>
            Địa chỉ:{" "}
            {`${order.addressDetail} ${order.town} ${order.city} ${order.prefecture} `}
          </p>
          <p>Tiền tranh: {order?.totalPaintingsPrice}</p>
          <p>Tiền ship: {order?.deliveryCost}</p>
          <p>Giảm giá: {order?.discount}</p>
          <p className="font-semibold">
            Tổng: ¥{order?.totalPrice.toLocaleString("ja-JP")}
          </p>
          <div className="flex gap-2">
            <Button>Thanh toán</Button>
            <Button>Thanh toán sau</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPagePage;
