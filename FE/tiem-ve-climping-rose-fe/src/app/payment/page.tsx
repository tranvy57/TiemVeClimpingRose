"use client";

import { uploadImage } from "@/api/fileApi";
import { getOrderById, updateOrder } from "@/api/orderApi";
import OrderItem from "@/components/orders/OrderItem";
import { Button } from "@/components/ui/button";
import PinkSpinner from "@/components/ui/pink-spiner";
import { Separator } from "@/components/ui/separator";
import { showError, showSuccess } from "@/libs/toast";
import { IOrder } from "@/types/implements/order";
import { log } from "console";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PaymentPagePage = () => {
  const [order, setOrder] = useState<IOrder | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const fetchOrder = async () => {
    try {
      const orderId = searchParams.get("orderId");
      if (!orderId) {
        return;
      }
      const response = await getOrderById(orderId);
      setOrder(response.data);
    } catch (error) {
      showError("Lỗi khi lấy thông tin data");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleButtonSave = async () => {
    if (!imageFile || !order) {
      showError("Vui lòng thêm ảnh thanh toán");
      return;
    }
    try {
      setUploading(true);
      const { url } = await uploadImage(imageFile, "payment");
      console.log("Image upload", url);

      await updateOrder(order.orderId, {
        ...order,
        imagePayment: url,
        status: "PAYED",
      });
      showSuccess("Thanh toán thành công!");
      window.location.href = "/user?tab=orders";
    } catch (err) {
      console.error(err);
      showError("Lỗi khi tải ảnh lên");
    } finally {
      setUploading(false);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <div>
      {order ? (
        <div className="space-y-2">
          <p className="font-semibold">Đơn hàng của bạn:</p>
          {order?.orderItems.map((item) => {
            return (
              <OrderItem
                key={item.orderItemId}
                paintingId={item.painting.paintingId}
                name={item.painting.name}
                price={item.currentPrice}
                size={item.painting.size}
                quantity={item.quantity}
                imageUrl={item.painting.imageUrl}
              />
            );
          })}

          <p>Người nhận: {order?.receiverName}</p>
          <p>
            Địa chỉ:{" "}
            {`${order.addressDetail} ${order.town} ${order.city} ${order.prefecture} `}
          </p>
          <p>Tiền tranh: {order?.totalPaintingsPrice}</p>
          <p>Tiền ship: {order?.deliveryCost}</p>
          <p>Giảm giá: {order?.discount}</p>
          <p>Liên hệ: {order?.contact}</p>
          <p className="font-semibold text-red-400">
            Tổng: ¥{order?.totalPrice.toLocaleString("ja-JP")}
          </p>
          <Separator />
          <p className="font-semibold">
            Thanh toán chuyển tài khoản Nhật hoặc Việt Nam
          </p>
          <div className="md:flex gap-4">
            <div>
              <p>Tài khoản Việt Nam:</p>
              <p>Sacombank</p>
              <p>060296156232</p>
              <p>TRAN THI THUY VY</p>
              <Image src="/payment/qr.png" alt="QR" width={300} height={100} />
              <br />
            </div>
            <div>
              <p>Tài khoản Yucho Nhật Bản:</p>

              <Image
                src="/payment/yucho.jpg"
                alt="QR"
                width={300}
                height={100}
              />
            </div>
          </div>

          <Separator />

          {/* Upload ảnh thanh toán */}
          <div className="mt-4 space-y-2">
            <p className="font-semibold">Chọn ảnh thanh toán:</p>

            <label
              htmlFor="payment-upload"
              className="w-full max-w-xs flex items-center justify-center px-4 py-2 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 text-center text-gray-600"
            >
              {imageFile ? "Đã chọn: " + imageFile.name : "📤 Tải ảnh lên"}
            </label>
            <input
              id="payment-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {previewUrl && (
              <div className="mt-2">
                <p>Ảnh xem trước:</p>
                <Image
                  src={previewUrl}
                  alt="Xem trước ảnh"
                  width={300}
                  height={200}
                  className="rounded border"
                />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleButtonSave}>Xong</Button>
            <Button
              onClick={() => {
                window.location.href = "/payment-instruction";
              }}
            >
              Thanh toán sau
            </Button>
          </div>
          <Link href="/payment-instruction">
            <p className="underline">Xem hướng dẫn thanh toán sau tại đây</p>
          </Link>

          <div>{uploading && <PinkSpinner />}</div>
        </div>
      ) : (
        <div>{uploading && <PinkSpinner />}</div>
      )}
    </div>
  );
};

export default PaymentPagePage;
