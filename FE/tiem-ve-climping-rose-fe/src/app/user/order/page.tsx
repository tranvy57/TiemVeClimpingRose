"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { IOrder } from "@/types/implements/order";
import { showError } from "@/libs/toast";
import { getOrderById } from "@/api/orderApi";
import OrderItem from "@/components/orders/OrderItem";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PinkSpinner from "@/components/ui/pink-spiner";

const OrderDetailPage = () => {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<IOrder | null>(null);

  const getStatus = () => {
    if (order == null) return;
    if (order.status == "PENDING")
      return (
        <div className="bg-red-300 rounded-sm px-1">
          {" "}
          <p> Đang chờ thanh toán</p>
        </div>
      );
    else if (order.status == "PAYED")
      return (
        <div className="bg-blue-200 rounded-sm px-1">
          {" "}
          <p>Đã thanh toán</p>
        </div>
      );
    else if (order.status == "APPROVED")
      return (
        <div className="bg-green-200 rounded-sm px-1">
          {" "}
          <p>Đã xác nhận</p>
        </div>
      );
    else if (order.status == "CANCELED")
      return (
        <div className="bg-red-200 rounded-sm px-1">
          {" "}
          <p>Đã hủy</p>
        </div>
      );
    else if (order.status == "REJECTED")
      return (
        <div className="bg-red-200 rounded-sm px-1">
          {" "}
          <p>Bị từ chối</p>
        </div>
      );
  };

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
          <p>
            Tiền tranh: ¥{order?.totalPaintingsPrice.toLocaleString("ja-JP")}
          </p>
          <p>Tiền ship: ¥{order?.deliveryCost.toLocaleString("ja-JP")}</p>
          <p>Giảm giá: ¥{order?.discount.toLocaleString("ja-JP")}</p>
          <p>Liên hệ: {order?.contact}</p>
          <p>Ghi chú: {order?.note}</p>
          <p className="font-semibold text-red-400">
            Tổng: ¥{order?.totalPrice.toLocaleString("ja-JP")}
          </p>
          <Separator />

          <div className="flex gap-2">
            <p className="font-semibold">Trạng thái: </p>
            {getStatus()}
          </div>
          <p>Ảnh thanh toán:</p>
          {order.imagePayment ? (
            <Image
              src={order.imagePayment}
              height={300}
              width={300}
              alt="Ảnh thanh toán"
            />
          ) : (
            <div>
              <p>Bạn vẫn chưa thanh toán đơn hàng này.</p>
              <Button
                onClick={() => {
                  window.location.href = `/payment?orderId=${order.orderId}`;
                }}
              >
                Thanh toán ngay
              </Button>
            </div>
          )}
          <Button>Hủy đơn hàng</Button>
        </div>
      )}
    </div>
  );
};

export default OrderDetailPage;
