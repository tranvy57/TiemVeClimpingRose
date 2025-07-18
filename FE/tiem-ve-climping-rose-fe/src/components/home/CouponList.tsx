"use client";

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    fetchCoupons();
  }, []);
  return (
    <div className="flex my-2  md:justify-center overflow-x-auto scrollbar-hidden">
      <div className="flex gap-4 ">
        {coupons.map((c) => {
          return (
            <CouponItem
              key={c.couponId}
              imageUrl={c.imageUrl}
              code={c.code}
              discountPercentage={c.discountPercentage}
              condition={c.condition}
              description={c.description}
            />
          );
        })}
      </div>
    </div>
  );
}
