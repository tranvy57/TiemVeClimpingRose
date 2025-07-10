import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface OrderItemProps {
  paintingId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const OrderItem = ({
  paintingId,
  name,
  size,
  price,
  quantity,
  imageUrl,
}: OrderItemProps) => {
  return (
    <div className="p-2">
      <div className="flex justify-between">
        <div className="flex gap-1">
          <Image src={imageUrl} alt={name} width={50} height={50} />
          <div>
            <p
              onClick={() => {
                window.location.href = `/paintings/${paintingId}`;
              }}
              className="text-sm font-semibold hover:underline cursor-pointer"
            >
              {name}
            </p>
            <p className="text-sm font-light">{size}</p>
          </div>
        </div>

        <div>
          <p className="font-semibold text-red-500">
            ¥{price.toLocaleString("ja-JP")}
          </p>
          <p>x{quantity}</p>
        </div>
      </div>

      <Separator className="mt-2" />
    </div>
  );
};

export default OrderItem;
