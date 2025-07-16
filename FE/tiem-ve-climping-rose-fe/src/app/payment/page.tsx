"use client";

import { getOrderById } from "@/api/orderApi";
import OrderItem from "@/components/orders/OrderItem";
import { Button } from "@/components/ui/button";
import { showError } from "@/libs/toast";
import { IOrder } from "@/types/implements/order";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PaymentPagePage = () => {
  const [order, setOrder] = useState<IOrder | null>(null);
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
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <div>
      {order && (
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
          <p className="font-semibold">
            Tổng: ¥{order?.totalPrice.toLocaleString("ja-JP")}
          </p>
          <div className="flex gap-2">
            <Button>Thanh toán ngay</Button>
            <Button>Thanh toán sau</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-xl font-semibold">Hướng dẫn thanh toán:</p>
        <p>
          Sau khi đặt hàng, đơn hàng của bạn sẽ ở trạng thái{" "}
          <span className="font-semibold text-red-400">
            Đang chờ thanh toán{" "}
          </span>
          trong vòng <span className="font-semibold text-red-400">7 ngày</span>
        </p>
        <p>
          Nếu{" "}
          <span className="font-semibold text-red-400">
            không thanh toán trong vòng 7 ngày{" "}
          </span>{" "}
          đơn hàng sẽ{" "}
          <span className="font-semibold text-red-400">tự động bị hủy.</span>
        </p>
        <p>Để thanh toán bạn vui lòng xem phần hướng dẫn dưới đây:</p>
        <p>
          <span className="font-semibold">Bước 1:</span> Chọn vào biểu tượng
          người dùng sau khi đã đăng nhập, chọn mục "Đơn hàng"
        </p>
        <Image src="/payment/step1.png" alt="QR" width={300} height={100} />
        <p>
          <span className="font-semibold">Bước 2:</span> Tìm đơn hàng vừa đặt,
          chọn mục "Thanh toán"
        </p>
        <Image src="/payment/step2.png" alt="QR" width={300} height={100} />
        <p>Bấm thanh toán và chuyển vào tài khoản bên dưới:</p>
        <p className="font-semibold">
          Thanh toán chuyển tài khoản Nhật hoặc Việt Nam
        </p>
        <p>Tài khoản Việt Nam:</p>
        <p>Sacombank</p>
        <p>060296156232</p>
        <p>TRAN THI THUY VY</p>
        <Image src="/payment/qr.png" alt="QR" width={300} height={100} />
        <br />
        <p>Tài khoản Yucho Nhật Bản:</p>
        <p>Sacombank</p>
        <p>060296156232</p>
        <p>TRAN THI THUY VY</p>
        <Image src="/payment/qr.png" alt="QR" width={300} height={100} />

        <p>
          <span className="font-semibold">Bước 3: </span> Sau khi thanh toán
          xong, bạn{" "}
          <span className="font-semibold text-red-400">chụp màn hình</span> lại
          và <span className="font-semibold text-red-400">tải lên</span> sau đó
          bấm "Lưu"
        </p>

        <p>
          Sau khi tải ảnh lên xong bạn kiểm tra lại trạng thái đơn hàng, nếu đã
          tải lên thành công trạng thái sẽ chuyển thành{" "}
          <span className="font-semibold text-red-400">ĐANG CHỜ XÁC NHẬN</span>
        </p>

        <p>
          Khoảng{" "}
          <span className="font-semibold text-red-400">
            {" "}
            cuối ngày Tiệm sẽ xác nhận và gửi hàng
          </span>{" "}
          cho bạn
        </p>
        <p>Đơn hàng sẽ tới trong khoảng 2-5 ngày kể từ khi xác nhận.</p>
        <p>
          Nếu bạn có thắc mắc gì vui lòng liên hệ fb của shop nhé, cảm ơn bạn.
        </p>
      </div>
    </div>
  );
};

export default PaymentPagePage;
