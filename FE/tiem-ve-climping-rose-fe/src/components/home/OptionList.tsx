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
        <div
          onClick={() => handleClick("SIZE_20x20")}
          className="cursor-pointer md:w-[180px]"
        >
          <OptionItem
            name={t("options.size2020")}
            image_url="https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/501015466_122187330950290227_3675582043956886798_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFtJfCNmZ139DLSfhDL2EWzvcUKA1S6mru9xQoDVLqau0m8rJdiROFAJOyBtQBFaMrFlrDb06vpPYn9b1ba551-&_nc_ohc=BheGRLEE6doQ7kNvwGA8dHW&_nc_oc=AdnqbF5ocW-FUfKKwYK-NJrXn9Fv2qtyKDT70M4eHUdzMYKbg1bxG4yOxlaaK4H-d94&_nc_zt=23&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=Xe-O6q-L80OcMh4Iwd121Q&oh=00_AfP3OBmIfklBxXJNhXhTssO9H-fmyIQPxg4LQ6z1jzufng&oe=684E2BE1"
          />
        </div>

        <div
          onClick={() => handleClick("SIZE_30x40")}
          className="cursor-pointer md:w-[180px]"
        >
          <OptionItem
            name={t("options.size3040")}
            image_url="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/504717995_122188566722290227_5727451694699947074_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGMztuAaJ2TXNl37_Aa9Ors7bcx5WQWyjfttzHlZBbKN2fqb4FDMRLz2rzdC5h1KZL5L5d2oMGRSorWCjMZi8yO&_nc_ohc=x0I9D2CSTxoQ7kNvwGcW-35&_nc_oc=AdlqmnicgENCej7whBoRrr6S7_vnohjEpOU13j6VzszmTuFRKGYz1GolORQI-tuf9aY&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=zhxX2h3ML36693D5UrGl3g&oh=00_AfN1NAfxRP1MeN0AqaHj8LCS8Ra7lTwiCgvI40lmV_pLbQ&oe=684E555B"
          />
        </div>

        <div
          onClick={() => handleClick("SIZE_40x50")}
          className="cursor-pointer md:w-[180px]"
        >
          <OptionItem
            name={t("options.size4050")}
            image_url="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/503890777_122187943412290227_3112697819398646579_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE6xoq9X5z1IM3GheYm1oVv18ixA8TEncDXyLEDxMSdwHHB4KH6MrcS46fZJPkZ8A_UUb6ZNStZ7ukV8vjqb_N1&_nc_ohc=tHMS8z-hpFUQ7kNvwFENjTV&_nc_oc=AdkahRzpaGRdTAS5Xjm4OSKV7ddumB_2ePNSYltG5qIPKPBiM4UWNNBgsiw58qwTzjA&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=CEHizhwLcq5UwlgoebWgtg&oh=00_AfP6znQnD8ut9hgXMk5HuDiDuHoM2aeeu-hnC2lLCIZ9QQ&oe=684E48A9"
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <div>
              <OptionItem
                name={t("options.custom")}
                image_url="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/500278549_122187024380290227_7028543360190307289_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeEJZ-L3vbK7ZduxZhr-7C9EPuRTRTp05qg-5FNFOnTmqIooghun_AtNllArQqF_7VhifD5fLwJ1P5W-WvTleN-N&_nc_ohc=jYV8wnRYeKcQ7kNvwFiMeHb&_nc_oc=Adm-zkL5yaG4KSMloOe5sd4DxVd2fekAiEeVYmmqlHc5GtYpAVMGYmwTc2fPuQaxZ0Q&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=adbOwcByXlOqXpGf3xO_uw&oh=00_AfP9QgxDn3rvfyRASqYlUpFxsA9uBIt-K-UL3SCSAHmV9w&oe=684E6154"
              />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tranh theo yêu cầu</DialogTitle>
              <DialogDescription>
                Để đặt tranh theo yêu cầu, bạn vui lòng nhắn tin trực tiếp vào
                Facebook của tiệm để được tư vấn và báo giá:
              </DialogDescription>
            </DialogHeader>

            <div className="relative w-[300px] h-[120px] inline-block ml-2">
              <p>Nhấp vào để mở: </p>
              <a
                href="https://www.facebook.com/tiemveclimpingrose"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 transition-colors"
              >
                https://www.facebook.com/tiemveclimpingrose
              </a>
              <div className="relative w-[300px] h-[100px] inline-block ml-2 mt-1">
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
      </div>
    </div>
  );
}
