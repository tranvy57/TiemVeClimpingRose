"use client";

import React, { useState } from "react";
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
import { Copy, CopyCheck } from "lucide-react";

type DiscountType = "disc300" | "disc500" | "freeship";

interface CouponItemProps {
  imageUrl: string;
  code: string;
  discountPercentage: number;
  condition: string;
  description: string;
}

export function CouponItem({
  imageUrl,
  discountPercentage,
  code,
  description,
  condition,
}: CouponItemProps) {
  const t = useTranslations("home");
  const [copied, setCopied] = useState(false);
  const [copiedInDialog, setCopiedInDialog] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleDialogCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedInDialog(true);
      setTimeout(() => setCopiedInDialog(false), 2000);
    } catch (err) {
      console.error("Copy in dialog failed", err);
    }
  };

  return (
    <div className="flex items-start w-[280px] md:w-[350px] border border-l-0 h-fit">
      <Image src={imageUrl} height={50} width={100} alt="coupon" />

      <div className="flex-1 p-2 space-y-[4px] justify-between flex flex-col">
        <p className="text-[13px] font-bold">
          {t("coupon.enterCode", { code })}
        </p>
        <p className="text-[12px] text-gray-700">{description}</p>

        <div className="flex items-end justify-end">
          <Button
            className="bg-red-300 hover:bg-red-400 text-white px- py-0 text-sm"
            onClick={handleCopy}
          >
            {copied ? (
              <div className="flex items-center gap-1">
                <CopyCheck /> Đã sao chép
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Copy /> Sao chép
              </div>
            )}
          </Button>

          {/* Modal điều kiện */}
          {/* <Dialog>
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

              {description}

              <DialogFooter className="mt-4">
                <Button
                  className="bg-red-300 hover:bg-red-400 text-white px-3 py-1 text-sm"
                  onClick={handleDialogCopy}
                >
                  {copiedInDialog ? "✅ Copied!" : t("coupon.copy")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
        </div>
      </div>
    </div>
  );
}
