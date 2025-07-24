import { IOrder } from "@/types/implements/order";
import React from "react";
import OrderItem from "./OrderItem";
import { Button } from "../ui/button";

interface OrderProps {
  order: IOrder;
}
const Order = ({ order }: OrderProps) => {
  const getStatus = () => {
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
  return (
    <div
      className="rounded-md shadow-sm p-2 md:px-4 space-y-2"
      onClick={() => {
        window.location.href = `/user/order?orderId=${order.orderId}`;
      }}
    >
      <div className="flex justify-between items-center">
        {getStatus()}
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

        {order.status == "PENDING" && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/payment?orderId=${order.orderId}`;
            }}
          >
            Thanh toán
          </Button>
        )}
      </div>

      <div className="flex justify-end"></div>
    </div>
  );
};

export default Order;
