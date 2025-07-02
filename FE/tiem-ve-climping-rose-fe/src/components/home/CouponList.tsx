import React from "react";
import { CouponItem } from "./CouponItem";

export function CouponList() {
  return (
    <div className="flex gap-4 my-4 overflow-x-auto scrollbar-hidden md:justify-center">
      <CouponItem
        image_url="/coupons/coupon300.png"
        code="CPR300"
        discount="300¥"
        minOrder="3,000¥"
        discountType="disc300"
        conditions={
          <ul className="list-disc pl-5 space-y-1">
            <li>Đơn hàng tối thiểu 3,000¥</li>
            <li>Áp dụng 1 lần</li>
          </ul>
        }
      />
      <CouponItem
        image_url="/coupons/coupon500.png"
        code="CPR500"
        discount="500¥"
        minOrder="6,000¥"
        discountType="disc500"
        conditions={<p>Áp dụng cho đơn từ 6,000¥</p>}
      />
      <CouponItem
        image_url="/coupons/couponfreeship.png"
        code="FREESHIP"
        discount="phí vận chuyển"
        minOrder="10,000¥"
        discountType="freeship"
        conditions={<p>Giao hàng miễn phí cho đơn hàng từ 10,000¥</p>}
      />
    </div>
  );
}
