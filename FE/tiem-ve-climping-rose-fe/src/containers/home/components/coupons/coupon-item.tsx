"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useTranslations } from "next-intl";

type DiscountType = "disc300" | "disc500" | "freeship";

interface CouponItemProps {
  image_url: string;
  code: string;
  discount: string;
  minOrder: string;
  discountType: DiscountType;
  conditions: React.ReactNode;
}

const CouponItem = ({
  image_url,
  discount,
  code,
  minOrder,
  discountType,
  conditions,
}: CouponItemProps) => {
  const t = useTranslations("home");

  const getDescription = () => {
    return t(`coupon.desc.${discountType}`, {
      discount,
      minOrder,
    });
  };
  return (
    <div className="flex items-start min-w-[300px] max-w-[400px] max-h-fit">
      <Image src={image_url} height={100} width={100} alt="coupon" />

      <div className="flex-1 space-y-2 border h-full p-2 justify-between flex flex-col">
        <p className="text-red400 font-bold">
          {t("coupon.enterCode", { code })}
        </p>
        <p className="text-sm text-gray-700">{getDescription()}</p>
        <div className="flex items-end space-x-3 justify-between">
          <Button className="bg-red-300 hover:bg-red-400 text-white px-3 py-1 text-sm">
            {t("coupon.copy")}
          </Button>
          {/* Modal điều kiện */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-gray-700 text-sm underline hover:text-red-500 p-1">
                {t("coupon.conditionLink")}
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{t("coupon.conditionTitle")}</DialogTitle>
                <DialogDescription>Để sử dụng mã giảm giá:</DialogDescription>
              </DialogHeader>
              {conditions}
              <DialogFooter className="mt-4">
                <Button className="bg-red-300 hover:bg-red-400 text-white px-3 py-1 text-sm">
                  {t("coupon.copy")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CouponItem;
