import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-red-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-700">
        {/* Cột 1: Logo + mô tả */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/avt.jpg"
              alt="Tiệm Vẽ Climping Rose"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold text-lg text-red-500">
              Tiệm Vẽ Climping Rose
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Vào một ngày bình thường, tô một chút bình yên
          </p>
          <br />
          <p>
            Khách đặt tranh in hình vui lòng liên hệ qua{" "}
            <span>
              <Link
                href="https://www.facebook.com/tiemveclimpingrose"
                className="text-blue-600 hover:underline flex gap-2 items-center"
              >
                Facebook của Tiệm
              </Link>
            </span>
          </p>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div>
          <h4 className="font-bold mb-2 text-red-500">Danh mục</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:text-primary">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link href="/paintings" className="hover:text-primary">
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link href="/payment-instruction" className="hover:text-primary">
                Hướng dẫn thanh toán
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Liên hệ */}
        <div>
          <h4 className="font-bold mb-2 text-red-500">Liên hệ</h4>
          <ul className="space-y-1">
            <li>📍Japan</li>
            <li>📧climpingrose.jp@gmail.com</li>
            <li>
              <Link
                href="https://www.facebook.com/tiemveclimpingrose"
                className="text-blue-600 hover:underline flex gap-2 items-center"
              >
                <Image src="fb.svg" width={20} height={20} alt="tiktok" />
                Tiệm vẽ Climping Rose
              </Link>
            </li>
            <li>
              <Link
                href="https://www.tiktok.com/@tiemtranhsohoatainhatt"
                className="text-blue-600 hover:underline flex gap-2 items-center"
              >
                <Image src="tiktok.svg" width={16} height={16} alt="tiktok" />
                Tiệm tranh số hóa tại Nhật
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-200">
        © {new Date().getFullYear()} Climping Rose. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
