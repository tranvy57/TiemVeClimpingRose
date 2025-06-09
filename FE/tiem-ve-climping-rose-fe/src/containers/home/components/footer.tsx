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
              src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/438239357_1197871551199970_4062135167905877969_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHV9tnhydUXMgoL0xxeViRV2krt3c9t7ynaSu3dz23vKaqNObRhuzj73yqrZZTnv0s_kwTY8ENRweAXrGqIbGbs&_nc_ohc=R1JfGsYkUssQ7kNvwHF6nkF&_nc_oc=Adn1Q1dXCUGwVsXXJ5bf-7JdLKHlv9P5fqBsVN510qUo7mpa0bIYI8EEZrVo30izimE&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=FsR9Fr4IstewVZpUzzyZbA&oh=00_AfM_saoDn6TyCljK8iPHn38dTZXJVTBWpJZiBpMFiM7Iuw&oe=684C812D"
              alt="Tiệm vẽ Climping Rose"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold text-lg text-red-500">
              Tiệm vẽ Climping Rose
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Tiệm vẽ tranh thủ công – lan toả nghệ thuật và cảm xúc qua từng nét
            cọ.
          </p>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div>
          <h4 className="font-bold mb-2 text-red-500">Danh mục</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/tranh-phong-canh" className="hover:text-primary">
                Tranh phong cảnh
              </Link>
            </li>
            <li>
              <Link href="/tranh-thieu-nu" className="hover:text-primary">
                Tranh thiếu nữ
              </Link>
            </li>
            <li>
              <Link href="/tranh-phat" className="hover:text-primary">
                Tranh Phật
              </Link>
            </li>
            <li>
              <Link href="/tranh-cap-doi" className="hover:text-primary">
                Tranh cặp đôi
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Liên hệ */}
        <div>
          <h4 className="font-bold mb-2 text-red-500">Liên hệ</h4>
          <ul className="space-y-1">
            <li>📍 TP. Hồ Chí Minh</li>
            <li>📞 0909 999 999</li>
            <li>📧 hello@climpingrose.vn</li>
            <li>
              🌐{" "}
              <Link
                href="https://facebook.com"
                className="text-blue-600 hover:underline"
              >
                Facebook
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
