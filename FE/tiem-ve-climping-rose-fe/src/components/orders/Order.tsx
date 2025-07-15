import { IOrder } from "@/types/implements/order";
import React from "react";
import OrderItem from "./OrderItem";
import { Button } from "../ui/button";

interface OrderProps {
  order: IOrder;
}
const Order = ({ order }: OrderProps) => {
  const getStatus = () => {
    if (order.status == "PENDING") return "Đang chờ thanh toán";
  };
  return (
    <div className="rounded-md shadow-sm p-2 md:px-4 space-y-2">
      <div className="flex justify-between items-center">
        <p className="bg-red-200 rounded-sm text-sm px-1">{getStatus()}</p>
        <p className="text-sm text-gray-700">
          {new Date(order.orderDate).toLocaleDateString("vi-VN")}
        </p>
      </div>
      {order.orderItems.map((o) => {
        return (
          <OrderItem
            key={o.orderItemId}
            paintingId={o.painting.paintingId}
            name={o.painting.name}
            price={o.currentPrice}
            size={o.painting.size}
            quantity={o.quantity}
            imageUrl={o.painting.imageUrl}
          />
        );
      })}

      <div className="flex justify-between">
        <p className="">
          Tổng tiền:{" "}
          <span className="font-semibold text-red-500">
            {order.totalPrice.toLocaleString("ja-JP")}¥
          </span>
        </p>

        {order.status == "PENDING" && <Button>Thanh toán</Button>}
      </div>

      <div className="flex justify-end"></div>
    </div>
  );
};

export default Order;
