"use client";

import React, { useState } from "react";
import { CouponItem } from "./CouponItem";
import { getCoupons } from "@/api/couponAPi";
import { useTranslations } from "next-intl";
import { ICategory } from "@/types/implements/painting";
import { ICoupon } from "@/types/implements/coupon";

export function CouponList() {
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const t = useTranslations("home");
  const [loading, setLoading] = useState<boolean>(true);

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

  React.useEffect(() => {
    fetchCoupons();
  }, []);
  return (
    <div className="flex gap-4 my-4 overflow-x-auto scrollbar-hidden md:justify-center">
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
  );
}
