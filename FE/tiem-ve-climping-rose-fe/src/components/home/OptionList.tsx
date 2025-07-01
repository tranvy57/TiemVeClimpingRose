"use client";
import React from "react";
import { Link } from "lucide-react";
import { useTranslations } from "next-intl";
import { OptionItem } from "./OptionItem";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

export function OptionList() {
  const t = useTranslations("home");
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (size: string) => {
    const query = new URLSearchParams();
    query.set("size", size);
    router.push(`/paintings?${query.toString()}`);
  };

  return (
    <div>
      <div className="flex md:justify-between items-center mt-4 overflow-x-auto scrollbar-hidden gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <OptionItem
              name={t("options.custom")}
              image_url="https://res.cloudinary.com/dztelvbah/image/upload/v1751353652/custom_ztgqkp.jpg"
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tranh theo yêu cầu</DialogTitle>
              <DialogDescription>
                Để đặt tranh theo yêu cầu, bạn vui lòng nhắn tin trực tiếp vào
                Facebook của tiệm để được tư vấn và báo giá:
              </DialogDescription>
            </DialogHeader>

            <div className="relative h-[120px] inline-block w-full">
              <p>Nhấp vào để mở: </p>
              <a
                href="https://www.facebook.com/tiemveclimpingrose"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 transition-colors"
              >
                https://www.facebook.com/tiemveclimpingrose
              </a>
              <div className="relative w-[300px] h-[100px] inline-block  mt-1">
                <Image
                  src="/fb.png"
                  alt="Facebook"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <DialogFooter className="sm:justify-start mt-6">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Đóng
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div
          onClick={() => handleClick("SIZE_20x20")}
          className="cursor-pointer md:w-full"
        >
          <OptionItem
            name={t("options.size2020")}
            image_url="https://res.cloudinary.com/dztelvbah/image/upload/v1751348011/2020_dl8yj5.jpg"
          />
        </div>

        <div
          onClick={() => handleClick("SIZE_30x40")}
          className="cursor-pointer md:w-full"
        >
          <OptionItem
            name={t("options.size3040")}
            image_url="https://res.cloudinary.com/dztelvbah/image/upload/v1751348141/3040_jeqi0d.jpg"
          />
        </div>

        <div
          onClick={() => handleClick("SIZE_40x50")}
          className="cursor-pointer md:w-w-full"
        >
          <OptionItem
            name={t("options.size4050")}
            image_url="https://res.cloudinary.com/dztelvbah/image/upload/v1751348216/4050_ytizz6.jpg"
          />
        </div>
      </div>
    </div>
  );
}
