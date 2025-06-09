import {
  Facebook,
  Github,
  Linkedin,
  Menu,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50 px-4 py-3">
      <div className="container mx-auto flex justify-between items-center  ">
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

          <p className="font-bold text-lg text-gray-700">
            Tiệm vẽ Climping Rose
          </p>
        </div>

        {/* Nút menu mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-primary"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu desktop */}
        <div className="hidden md:flex gap-4 ">
          <Link className="menu-link" href="#">
            Tranh
          </Link>
          <Link className="menu-link" href="#">
            Trang chủ
          </Link>
          <Link className="menu-link" href="#">
            Feedback
          </Link>
          <Link className="menu-link" href="#">
            Blog
          </Link>

          <div className="flex gap-4 text-gray-700">
            <ShoppingCart className="icon-button" />
            <UserRound className="icon-button" />
          </div>
        </div>
      </div>
      {/* Menu mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-end px-4 py-3 bg-white border-t space-y-2  font-medium">
          <Link
            href="#"
            className="menu-link"
            onClick={() => setMenuOpen(false)}
          >
            Trang chủ
          </Link>
          <Link
            href="#"
            className="menu-link"
            onClick={() => setMenuOpen(false)}
          >
            Tranh
          </Link>
          <Link
            href="#"
            className="menu-link"
            onClick={() => setMenuOpen(false)}
          >
            Feedback
          </Link>
          <Link
            href="#"
            className="menu-link"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          <div className="flex gap-4 pt-2 text-gray-700">
            <ShoppingCart className="icon-button" />
            <UserRound className="icon-button" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
