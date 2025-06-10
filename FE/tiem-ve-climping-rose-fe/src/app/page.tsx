"use client";

import Home from "@/containers/home/page";

import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("HomePage");

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Home />
      <h1>{t("title")}</h1>
    </div>
  );
}
