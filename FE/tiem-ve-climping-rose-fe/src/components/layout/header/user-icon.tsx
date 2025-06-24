"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/hooks/store-hook";
import { Divide, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function UserIcon() {
  const { authenticated, user } = useAppSelector((state) => state.auth);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex">
          {authenticated && user ? (
            <Image
              src={
                user.avatar ||
                "https://png.pngtree.com/png-clipart/20200701/original/pngtree-cat-default-avatar-png-image_5416936.jpg"
              }
              alt="User Avatar"
              height={32}
              width={32}
              className="rounded-full"
            />
          ) : (
            <Button variant="ghost" className="icon-button">
              <UserRound className="icon-button" />
            </Button>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          {!authenticated ? (
            <Link href="/login">Đăng nhập</Link>
          ) : (
            <div>Đăng xuất</div>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
