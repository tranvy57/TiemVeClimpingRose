"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppSelector } from "@/hooks/store-hook";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { showError } from "@/libs/toast";
import OrderItem from "./OrderItem";

export default function ChekoutPage() {
  const { selectedCartItems, totalPaintingsPrice, totalPrice, deliveryCost } =
    useAppSelector((state) => state.checkout);
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState({
    prefecture: "",
    city: "",
    town: "",
  });

  const handleZipcodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    setZipcode(value);

    if (value.length === 7) {
      try {
        const res = await fetch(
          `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${value}`
        );
        const data = await res.json();

        if (data.results) {
          const result = data.results[0];
          setAddress({
            prefecture: result.address1,
            city: result.address2,
            town: result.address3,
          });
        } else {
          showError("Không tìm thấy địa chỉ cho mã bưu điện này.");
        }
      } catch {
        showError("Lỗi kết nối đến ZipCloud API.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-between md:flex-row-reverse gap-4">
      {/* Danh sách OrderItem */}
      <div className="md:w-[35%]">
        {selectedCartItems.map((item) => (
          <OrderItem
            key={item.cartItemId}
            paintingId={item.painting.paintingId}
            name={item.painting.name}
            price={item.painting.price}
            size={item.painting.size}
            quantity={item.quantity}
            imageUrl={item.painting.imageUrl}
          />
        ))}

        <div className="space-y-2">
          <p>
            Tổng tiền tranh:{" "}
            <span className="font-semibold">
              {totalPaintingsPrice.toLocaleString("ja-JP")}
            </span>
          </p>

          <p>Phí vận chuyển: ¥{deliveryCost.toLocaleString("ja-JP")}</p>

          <p className="text-gray-800 font-semibold">
            Tổng: ¥
            {(totalPaintingsPrice + deliveryCost).toLocaleString("ja-JP")}
          </p>

          <Button className="w-full">Đặt hàng</Button>
        </div>
      </div>
      <div className="md:flex-1 flex flex-col md:flex-row gap-4">
        <div className="md:w-[50%] space-y-4 ">
          <div className="space-y-2">
            <Label className="text-md" htmlFor="receiverName">
              Tên người nhận:
            </Label>
            <Input
              id="receiverName"
              type="text"
              placeholder="Nhập tên của bạn"
            />
          </div>

          <div className="space-y-2">
            <div>
              <Label className="text-md" htmlFor="receiverName">
                Liên hệ: (sđt, facebook, zalo, email){" "}
              </Label>

              <p className="font-light italic text-sm">
                (Tiệm sẽ liên hệ khi có lỗi)
              </p>
            </div>

            <Input
              id="contact"
              type="text"
              placeholder="Ví dụ: https://www.facebook.com/tiemveclimpingrose"
            />
          </div>

          <RadioGroup
            defaultValue="starter"
            className="grid grid-cols-2 gap-4 pt-2"
          >
            <div className="border rounded-lg p-4">
              <RadioGroupItem value="starter" id="starter" />
              <label className="text-md m-2 font-semibold" htmlFor="starter">
                Ship kiểu này
              </label>
              <p className="text-sm text-muted-foreground">
                Perfect for small businesses.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <RadioGroupItem value="pro" id="pro" />
              <label className="text-md m-2 font-semibold" htmlFor="pro">
                Ship kiểu kia
              </label>
              <p className="text-sm text-muted-foreground">
                More features and storage.
              </p>
            </div>
          </RadioGroup>

          <div className="space-y-2">
            <Label className="text-md" htmlFor="receiverName">
              Ghi chú:
            </Label>
            <Textarea placeholder="Ví dụ: Giao hàng lúc 5h chiều" />
          </div>
        </div>
        {/* Địa chỉ */}
        <div className="md:w-[50%] space-y-4">
          <div className="space-y-2">
            <div>
              <Label className="text-md" htmlFor="zipcode">
                Mã bưu điện:
              </Label>
              <p className="font-light italic text-sm">
                (Nhập đầy đủ mã bưu điện để hiện địa chỉ (7 số))
              </p>
            </div>
            <Input
              id="zipcode"
              type="text"
              value={zipcode}
              onChange={handleZipcodeChange}
              maxLength={7}
              placeholder="Ví dụ: 1000001"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-md" htmlFor="pref">
              Tỉnh/TP
            </Label>
            <Input
              id="pref"
              value={address.prefecture}
              readOnly
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-md" htmlFor="city">
              Quận/Huyện
            </Label>
            <Input
              id="city"
              value={address.city}
              readOnly
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-md" htmlFor="town">
              Phường/Xã
            </Label>
            <Input
              id="town"
              value={address.town}
              readOnly
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-md" htmlFor="detail">
              Địa chỉ cụ thể
            </Label>
            <Input
              id="detail"
              placeholder="Ví dụ: 1-2-3 サンプルビル 301号室"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
