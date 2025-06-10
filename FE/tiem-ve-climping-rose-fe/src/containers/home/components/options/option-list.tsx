import React from "react";
import OptionItem from "./option-item";
import { Link } from "lucide-react";
import { useTranslations } from "next-intl";

const OptionList = () => {
  const t = useTranslations("home");
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-md md:text-xl font-bold underline decoration-red-500 underline-offset-8">
          {t("size")}
        </p>
      </div>
      <div className="flex gap-4 mt-4 overflow-x-auto scrollbar-hidden ">
        <OptionItem
          name={t("options.size2020")}
          image_url="https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/501015466_122187330950290227_3675582043956886798_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFtJfCNmZ139DLSfhDL2EWzvcUKA1S6mru9xQoDVLqau0m8rJdiROFAJOyBtQBFaMrFlrDb06vpPYn9b1ba551-&_nc_ohc=BheGRLEE6doQ7kNvwGA8dHW&_nc_oc=AdnqbF5ocW-FUfKKwYK-NJrXn9Fv2qtyKDT70M4eHUdzMYKbg1bxG4yOxlaaK4H-d94&_nc_zt=23&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=Xe-O6q-L80OcMh4Iwd121Q&oh=00_AfP3OBmIfklBxXJNhXhTssO9H-fmyIQPxg4LQ6z1jzufng&oe=684E2BE1"
          href="#"
        />
        <OptionItem
          name={t("options.size3040")}
          image_url="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/504717995_122188566722290227_5727451694699947074_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGMztuAaJ2TXNl37_Aa9Ors7bcx5WQWyjfttzHlZBbKN2fqb4FDMRLz2rzdC5h1KZL5L5d2oMGRSorWCjMZi8yO&_nc_ohc=x0I9D2CSTxoQ7kNvwGcW-35&_nc_oc=AdlqmnicgENCej7whBoRrr6S7_vnohjEpOU13j6VzszmTuFRKGYz1GolORQI-tuf9aY&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=zhxX2h3ML36693D5UrGl3g&oh=00_AfN1NAfxRP1MeN0AqaHj8LCS8Ra7lTwiCgvI40lmV_pLbQ&oe=684E555B"
          href="#"
        />
        <OptionItem
          name={t("options.size4050")}
          image_url="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/503890777_122187943412290227_3112697819398646579_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE6xoq9X5z1IM3GheYm1oVv18ixA8TEncDXyLEDxMSdwHHB4KH6MrcS46fZJPkZ8A_UUb6ZNStZ7ukV8vjqb_N1&_nc_ohc=tHMS8z-hpFUQ7kNvwFENjTV&_nc_oc=AdkahRzpaGRdTAS5Xjm4OSKV7ddumB_2ePNSYltG5qIPKPBiM4UWNNBgsiw58qwTzjA&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=CEHizhwLcq5UwlgoebWgtg&oh=00_AfP6znQnD8ut9hgXMk5HuDiDuHoM2aeeu-hnC2lLCIZ9QQ&oe=684E48A9"
          href="#"
        />
        <OptionItem
          name={t("options.custom")}
          image_url="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/500278549_122187024380290227_7028543360190307289_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeEJZ-L3vbK7ZduxZhr-7C9EPuRTRTp05qg-5FNFOnTmqIooghun_AtNllArQqF_7VhifD5fLwJ1P5W-WvTleN-N&_nc_ohc=jYV8wnRYeKcQ7kNvwFiMeHb&_nc_oc=Adm-zkL5yaG4KSMloOe5sd4DxVd2fekAiEeVYmmqlHc5GtYpAVMGYmwTc2fPuQaxZ0Q&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=adbOwcByXlOqXpGf3xO_uw&oh=00_AfP9QgxDn3rvfyRASqYlUpFxsA9uBIt-K-UL3SCSAHmV9w&oe=684E6154"
          href="#"
        />
      </div>
    </div>
  );
};

export default OptionList;
