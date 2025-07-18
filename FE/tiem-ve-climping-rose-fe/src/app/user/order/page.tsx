"use client";

import React from "react";
import { useParams } from "next/navigation";

const OrderDetailPage = () => {
  const params = useParams();
  // params.orderId sẽ là string | undefined
  return <div>OrderDetailPage: {params.orderId}</div>;
};

export default OrderDetailPage;
