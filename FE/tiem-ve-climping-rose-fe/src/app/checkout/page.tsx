"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { showError } from "@/libs/toast";
import OrderItem from "../../components/orders/OrderItem";
import { setCheckoutData } from "@/store/slice/checkout-slice";
import { calculateDeliveryCost, checkCouponValid } from "@/utils/orderUltils";
import { ICoupon } from "@/types/implements/coupon";
import { getCoupons } from "@/api/couponAPi";
import { ChevronRight, Ticket } from "lucide-react";
import { CouponItem } from "@/components/home";

export default function ChekoutPage() {
  const { selectedCartItems, totalPaintingsPrice, totalPrice, deliveryCost } =
    useAppSelector((state) => state.checkout);

  const dispatch = useAppDispatch();
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState({
    prefecture: "",
    city: "",
    town: "",
  });
  const [addressDetail, setAddressDetail] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [note, setNote] = useState("");
  const [contact, setContact] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const [coupons, setCoupons] = useState<ICoupon[]>([]);

  const handleReceiverNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiverName(e.target.value);
  };

  const handleAddressDetailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddressDetail(e.target.value);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact(e.target.value);
  };

  const handleCouponCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
  };

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

          const paintingMap = Object.fromEntries(
            selectedCartItems.map((item) => [
              item.painting.paintingId,
              { size: item.painting.size, quantity: item.painting.quantity },
            ])
          );

          const updatedDeliveryCost = calculateDeliveryCost(
            selectedCartItems.map((item) => ({
              paintingId: item.painting.paintingId,
              quantity: item.quantity,
            })),
            paintingMap,
            result.address1 // prefecture
          );

          dispatch(
            setCheckoutData({
              selectedCartItems,
              totalPaintingsPrice,
              deliveryCost: updatedDeliveryCost,
              totalPrice: totalPaintingsPrice + updatedDeliveryCost,
            })
          );
        } else {
          showError("Không tìm thấy địa chỉ cho mã bưu điện này.");
        }
      } catch {
        showError("Lỗi kết nối đến ZipCloud API.");
      }
    } else {
      setAddress({
        prefecture: "",
        city: "",
        town: "",
      });
    }
  };

  const fetchCoupons = async () => {
    try {
      const response = await getCoupons();
      setCoupons(response.data || []);
    } catch (error) {
      console.error("Error fetching Coupons:", error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="flex flex-col justify-between md:flex-row-reverse gap-4 mb-[250px]">
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
        {/* Tính tiền ở máy tính */}
        <div className="space-y-2 hidden md:block">
          <div className="flex justify-between">
            <p>Tổng tiền tranh: </p>
            <p className="">¥{totalPaintingsPrice.toLocaleString("ja-JP")}</p>
          </div>

          <div className="flex justify-between">
            <p>Phí vận chuyển: </p>
            <p>¥{deliveryCost.toLocaleString("ja-JP")}</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <div className="flex w-full justify-between">
                <div className="flex items-center gap-2">
                  <Ticket className="text-red-400" />
                  <p>Mã giảm giá:</p>
                </div>
                <div className="flex items-center gap-2 cursor-pointer float-end">
                  <ChevronRight />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  <div className="flex gap-4 flex-col py-4 items-center justify-center">
                    {coupons.map((c) => {
                      const isValid = checkCouponValid(
                        c.code,
                        selectedCartItems.map((item) => ({
                          paintingId: item.painting.paintingId,
                          quantity: item.quantity,
                        })),
                        Object.fromEntries(
                          selectedCartItems.map((item) => [
                            item.painting.paintingId,
                            {
                              size: item.painting.size,
                              quantity: item.painting.quantity,
                              price: item.painting.price,
                            },
                          ])
                        )
                      );

                      return (
                        <div
                          key={c.couponId}
                          className={`w-full p-2 rounded-md ${
                            isValid
                              ? "cursor-pointer hover:bg-muted"
                              : "opacity-50 pointer-events-none"
                          }`}
                          onClick={() => {
                            if (isValid) {
                              setCouponCode(c.code);
                            }
                          }}
                        >
                          <CouponItem
                            imageUrl={c.imageUrl}
                            code={c.code}
                            discountPercentage={c.discountPercentage}
                            condition={c.condition}
                            description={c.description}
                          />
                        </div>
                      );
                    })}
                  </div>
                </DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <div className="space-y-2 ">
            <Input
              id="coupon"
              value={couponCode}
              onChange={handleCouponCodeChange}
              type="text"
              placeholder="Nhập mã giảm giá"
            />
          </div>

          <p className="text-gray-800 font-semibold">
            Tổng: ¥
            {(totalPaintingsPrice + deliveryCost).toLocaleString("ja-JP")}
          </p>

          <Button className="w-full">Đặt hàng</Button>
        </div>

        {/* Tính tiền ở mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 block md:hidden z-50 space-y-2">
          <div className="flex justify-between">
            <p>Tổng tiền tranh: </p>
            <p className="">¥{totalPaintingsPrice.toLocaleString("ja-JP")}</p>
          </div>

          <div className="flex justify-between">
            <p>Phí vận chuyển: </p>
            <p>¥{deliveryCost.toLocaleString("ja-JP")}</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <div className="flex w-full justify-between">
                <div className="flex items-center gap-2">
                  <Ticket className="text-red-400" />
                  <p>Mã giảm giá:</p>
                </div>
                <div className="flex items-center gap-2 cursor-pointer float-end">
                  <ChevronRight />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  <div className="flex gap-4 flex-col py-4 items-center justify-center">
                    {coupons.map((c) => {
                      const isValid = checkCouponValid(
                        c.code,
                        selectedCartItems.map((item) => ({
                          paintingId: item.painting.paintingId,
                          quantity: item.quantity,
                        })),
                        Object.fromEntries(
                          selectedCartItems.map((item) => [
                            item.painting.paintingId,
                            {
                              size: item.painting.size,
                              quantity: item.painting.quantity,
                              price: item.painting.price,
                            },
                          ])
                        )
                      );

                      return (
                        <div
                          key={c.couponId}
                          className={`w-full p-2 rounded-md ${
                            isValid
                              ? "cursor-pointer hover:bg-muted"
                              : "opacity-50 pointer-events-none"
                          }`}
                          onClick={() => {
                            if (isValid) {
                              setCouponCode(c.code);
                            }
                          }}
                        >
                          <CouponItem
                            imageUrl={c.imageUrl}
                            code={c.code}
                            discountPercentage={c.discountPercentage}
                            condition={c.condition}
                            description={c.description}
                          />
                        </div>
                      );
                    })}
                  </div>
                </DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <div className="space-y-2 ">
            <Input
              id="coupon"
              value={couponCode}
              onChange={handleCouponCodeChange}
              type="text"
              placeholder="Nhập mã giảm giá"
            />
          </div>

          <div className="flex justify-between">
            <p className="text-gray-800 font-semibold">Tổng:</p>
            <p className="font-semibold text-red-500">
              ¥{(totalPaintingsPrice + deliveryCost).toLocaleString("ja-JP")}
            </p>
          </div>

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
              value={receiverName}
              onChange={handleReceiverNameChange}
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
              value={contact}
              onChange={handleContactChange}
              type="text"
              placeholder="Ví dụ: https://www.facebook.com/tiemveclimpingrose"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-md" htmlFor="receiverName">
              Ghi chú:
            </Label>
            <Textarea
              placeholder="Ví dụ: Giao hàng lúc 5h chiều"
              value={note}
              onChange={handleNoteChange}
            />
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

            <p className="font-light italic text-sm">
              ("沖縄", "北海道", "長崎", "大分" cộng phí ship 400¥)
            </p>
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
              value={addressDetail}
              onChange={handleAddressDetailChange}
              placeholder="Ví dụ: 1-2-3 サンプルビル 301号室"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
