"use client";

import { getMyOrders } from "@/api/orderApi";
import { showError } from "@/libs/toast";
import { IOrder } from "@/types/implements/order";
import { error } from "console";
import React, { useEffect, useState } from "react";
import Order from "./Order";
import PinkSpinner from "../ui/pink-spiner";

const OrderList = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fecthOrders = async () => {
    try {
      const response = await getMyOrders();
      if (response.data) setOrders(response.data);
    } catch (error) {
      showError("Lỗi xảy ra khi lấy dữ liệu đơn hàng.");
    }
  };

  useEffect(() => {
    fecthOrders();
  }, []);

  return (
    <div>
      {orders.length > 0 ? (
        <div>
          {orders.length > 0 ? (
            <div className="space-y-3">
              {orders.map((o) => {
                return <Order key={o.orderId} order={o} />;
              })}
            </div>
          ) : (
            <div>Oops!! Bạn chưa có đơn hàng nào!!</div>
          )}
        </div>
      ) : (
        <PinkSpinner />
      )}
    </div>
  );
};

export default OrderList;
