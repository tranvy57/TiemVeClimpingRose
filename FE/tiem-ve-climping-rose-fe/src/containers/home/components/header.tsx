import {
  Facebook,
  Github,
  Linkedin,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex justify-between items-center fixed top-0 left-0 w-full bg-white z-50 p-4 ">
      {/* Logo + Tiêu đề */}
      <div className="flex justify-between items-center gap-2 ">
        <Image
          src={
            "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/438239357_1197871551199970_4062135167905877969_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHV9tnhydUXMgoL0xxeViRV2krt3c9t7ynaSu3dz23vKaqNObRhuzj73yqrZZTnv0s_kwTY8ENRweAXrGqIbGbs&_nc_ohc=R1JfGsYkUssQ7kNvwHF6nkF&_nc_oc=Adn1Q1dXCUGwVsXXJ5bf-7JdLKHlv9P5fqBsVN510qUo7mpa0bIYI8EEZrVo30izimE&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=FsR9Fr4IstewVZpUzzyZbA&oh=00_AfM_saoDn6TyCljK8iPHn38dTZXJVTBWpJZiBpMFiM7Iuw&oe=684C812D"
          }
          alt="logo"
          width={50}
          height={50}
          className="rounded-full"
        />

        <p className="font-bold text-lg text-gray-700">Tiệm vẽ Climping Rose</p>
      </div>

      <div className="flex gap-4 text-md font-bold text-red-400 ">
        <a href="#">Trang chủ</a>
        <a href="#">Tranh</a>
        <a href="#">Feedback</a>
        <a href="#">Blog</a>

        <div className="flex gap-4 text-gray-700">
          <ShoppingCart />
          <UserRound />
        </div>
      </div>
    </div>
  );
};

export default Header;
