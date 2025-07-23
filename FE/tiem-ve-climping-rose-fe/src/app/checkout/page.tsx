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
import { showError, showSuccess } from "@/libs/toast";
import OrderItem from "../../components/orders/OrderItem";
import {
  setCheckoutData,
  setSelectedCoupon,
} from "@/store/slice/checkout-slice";
import { calculateDeliveryCost, checkCouponValid } from "@/utils/orderUltils";
import { ICoupon } from "@/types/implements/coupon";
import { getCouponByCode, getCoupons } from "@/api/couponAPi";
import { ChevronRight, Ticket } from "lucide-react";
import { CouponItem } from "@/components/home";
import { createOrder, OrderRequest } from "@/api/orderApi";
import { useRouter } from "next/navigation";

export default function ChekoutPage() {
  const {
    selectedCartItems,
    totalPaintingsPrice,
    deliveryCost,
    discount,
    totalPrice,
    couponCode, // ← thêm dòng này
  } = useAppSelector((state) => state.checkout);

  const router = useRouter();

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
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [selectedCoupon, setSelectCoupon] = useState<string>("");

  const [open, setOpen] = useState(false);

  const fetchCoupon = async (code: string) => {
    try {
      const response = await getCouponByCode(code);
      setOpen(false);
      if (response.data?.code === "CPRFREESHIP") {
        return deliveryCost;
      } else return response.data?.discountPercentage;
    } catch (error) {
      showError("Không lấy được mã giảm giá");
    }
  };
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

          let updatedDiscount = discount;

          // Nếu coupon là freeship thì discount = deliveryCost mới
          if (couponCode === "CPRFREESHIP") {
            updatedDiscount = updatedDeliveryCost;
          }

          // Dispatch cập nhật lại tất cả
          dispatch(
            setCheckoutData({
              selectedCartItems,
              totalPaintingsPrice,
              deliveryCost: updatedDeliveryCost,
              totalPrice:
                totalPaintingsPrice +
                updatedDeliveryCost -
                (updatedDiscount ?? 0),
              couponCode,
              discount: updatedDiscount,
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
    const init = async () => {
      await fetchCoupons();

      if (couponCode) {
        const discountValue = await fetchCoupon(couponCode);
      }
    };
    init();
  }, []);

  const handleSubmitOrder = async () => {
    if (
      !receiverName ||
      !zipcode ||
      !address.prefecture ||
      !address.city ||
      !address.town ||
      !addressDetail ||
      !contact
    ) {
      showError("Vui lòng nhập đầy đủ thông tin giao hàng.");
      return;
    }

    const cartItemIds = selectedCartItems.map((item) => item.cartItemId);

    const orderPayload: OrderRequest = {
      orderDate: new Date(),
      deliveryCost,
      totalPaintingsPrice,
      note,
      paymentMethod: "COD",
      receiverName,
      contact,
      zipCode: zipcode,
      prefecture: address.prefecture,
      city: address.city,
      town: address.town,
      addressDetail,
      cartItemIds,
      couponCode: couponCode || undefined,
      phone: contact,
      email: "",
      postalCode: zipcode,
    };

    try {
      const response = await createOrder(orderPayload);
      router.push(`/payment?orderId=${response.data?.orderId}`);
    } catch (err) {
      console.error(err);
      showError("Đặt hàng thất bại. Vui lòng thử lại.");
    }
  };

  const handleApplyCoupon = async () => {
    const isValid = checkCouponValid(
      selectedCoupon || "",
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

    if (isValid) {
      if (selectedCoupon) {
        const discountValue = await fetchCoupon(selectedCoupon);
        if (typeof discountValue === "number") {
          dispatch(
            setSelectedCoupon({
              couponCode: selectedCoupon,
              discount: discountValue,
            })
          ); // lưu vào Redux

          dispatch(
            setCheckoutData({
              selectedCartItems,
              totalPaintingsPrice,
              deliveryCost,
              totalPrice: totalPaintingsPrice + deliveryCost - discountValue,
              couponCode: selectedCoupon,
              discount: discountValue,
            })
          );
          showSuccess("Áp dụng mã giảm giá thành công!");
          setOpen(false); // đóng dialog
        }
      }
    } else {
      showError("Mã này không được áp dụng cho đơn hàng này.");
    }
  };

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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer justify-between">
                <p>Xem mã giảm giá</p>
                <ChevronRight />
              </div>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className="text-center text-lg font-bold">
                  Chọn mã giảm giá
                </DialogTitle>
              </DialogHeader>

              {/* WRAPPER căn giữa tất cả nội dung */}
              <div className="flex flex-col items-center justify-start gap-4 py-4">
                {/* Ô nhập mã và nút áp dụng */}
                <div className="flex gap-2 w-full max-w-md">
                  <Input
                    id="coupon"
                    value={selectedCoupon}
                    onChange={(e) => setSelectCoupon(e.target.value)}
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    className="flex-1"
                  />
                  <Button onClick={handleApplyCoupon}>Áp dụng</Button>
                </div>

                {/* Danh sách coupon có cuộn */}
                <div className="overflow-y-auto max-h-[50vh] flex flex-col gap-1  ">
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
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex justify-between">
            <p>Tổng tiền tranh: </p>
            <p className="">¥{totalPaintingsPrice.toLocaleString("ja-JP")}</p>
          </div>

          <div className="flex justify-between">
            <p>Phí vận chuyển: </p>
            <p>¥{deliveryCost.toLocaleString("ja-JP")}</p>
          </div>

          <div className="flex justify-between">
            <p>Giá được giảm: </p>
            <p>¥{discount.toLocaleString("ja-JP")}</p>
          </div>

          <p className="text-gray-800 font-semibold">
            Tổng: ¥
            {(totalPaintingsPrice + deliveryCost - discount).toLocaleString(
              "ja-JP"
            )}
          </p>

          <Button className="w-full" onClick={handleSubmitOrder}>
            Đặt hàng
          </Button>
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

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer justify-between">
                <p>Xem mã giảm giá</p>
                <ChevronRight />
              </div>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className="text-center text-lg font-bold">
                  Chọn mã giảm giá
                </DialogTitle>
              </DialogHeader>

              {/* WRAPPER căn giữa tất cả nội dung */}
              <div className="flex flex-col items-center justify-start gap-4 py-4">
                {/* Ô nhập mã và nút áp dụng */}
                <div className="flex gap-2 w-full max-w-md">
                  <Input
                    id="coupon"
                    value={selectedCoupon}
                    onChange={(e) => setSelectCoupon(e.target.value)}
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    className="flex-1"
                  />
                  <Button onClick={handleApplyCoupon}>Áp dụng</Button>
                </div>

                {/* Danh sách coupon có cuộn */}
                <div className="overflow-y-auto max-h-[50vh] flex flex-col gap-1  ">
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
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex justify-between">
            <p>Giá được giảm: </p>
            <p>¥{discount.toLocaleString("ja-JP")}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-800 font-semibold">Tổng:</p>
            <p className="font-semibold text-red-500">
              ¥
              {(totalPaintingsPrice + deliveryCost - discount).toLocaleString(
                "ja-JP"
              )}
            </p>
          </div>

          <Button className="w-full" onClick={handleSubmitOrder}>
            Đặt hàng
          </Button>
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
