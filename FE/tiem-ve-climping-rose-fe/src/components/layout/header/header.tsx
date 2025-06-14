"use client";

import { Globe, Menu, ShoppingCart, UserRound, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./language-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("home");

  useEffect(() => {
    setMounted(true); // Khi lên client mới set true
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50 md:py-1 px-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo + Tiêu đề */}
        <div className="flex justify-between items-center gap-2 ">
          <Link href="/">
            <Image
              src={
                "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/438239357_1197871551199970_4062135167905877969_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHV9tnhydUXMgoL0xxeViRV2krt3c9t7ynaSu3dz23vKaqNObRhuzj73yqrZZTnv0s_kwTY8ENRweAXrGqIbGbs&_nc_ohc=R1JfGsYkUssQ7kNvwHF6nkF&_nc_oc=Adn1Q1dXCUGwVsXXJ5bf-7JdLKHlv9P5fqBsVN510qUo7mpa0bIYI8EEZrVo30izimE&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=FsR9Fr4IstewVZpUzzyZbA&oh=00_AfM_saoDn6TyCljK8iPHn38dTZXJVTBWpJZiBpMFiM7Iuw&oe=684C812D"
              }
              alt="logo"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>

          <p className="font-bold text-md lg:text-lg text-gray-700">
            {t("title")}
          </p>
        </div>

        {/* Nút menu mobile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary"
            >
              <Menu size={24} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="md:hidden w-full mt-2">
            <DropdownMenuItem asChild>
              <Link href="/">{t("menu.home")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/paintings">{t("menu.products")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#">{t("menu.feedbacks")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#">{t("menu.blog")}</Link>
            </DropdownMenuItem>

            <div className="px-2 pt-2 flex gap-4 text-gray-700">
              <ShoppingCart className="icon-button" />
              <UserRound className="icon-button" />
              <LanguageSwitcher />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Menu desktop */}
        <div className="hidden md:flex gap-4 ">
          <Link className="menu-link" href="/">
            {t("menu.home")}
          </Link>
          <Link className="menu-link" href="/paintings">
            {t("menu.products")}
          </Link>
          <Link className="menu-link" href="#">
            {t("menu.feedbacks")}
          </Link>
          <Link className="menu-link" href="#">
            {t("menu.blog")}
          </Link>

          <div className="flex gap-4 text-gray-700">
            <ShoppingCart className="icon-button" />
            <UserRound className="icon-button" />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
