"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { CategoryItem } from "./CategoryItem";
import { useRouter } from "next/navigation";
import { getCategories } from "@/api/categoryApi";
import { ICategory } from "@/types/implements/painting";
import { Pin } from "lucide-react";
import PinkSpinner from "../ui/pink-spiner";

export function CategoryList() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const t = useTranslations("home");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const handleClick = (categoryId: string) => {
    const query = new URLSearchParams();
    query.set("category", categoryId);
    router.push(`/paintings?${query.toString()}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-md md:text-xl font-bold underline decoration-red-500 underline-offset-8">
          {t("categories")}
        </p>
        <Link href="/paintings" className="font-normal text-red-400 underline">
          Xem tất cả
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:gap-10 lg:gap-16 md:px-4 mt-4 md:mt-10">
        {categories.map((cat) => (
          <div key={cat.categoryId} onClick={() => handleClick(cat.categoryId)}>
            <CategoryItem
              title={cat.name}
              description={cat.description}
              image_url={cat.imageUrl}
              href="#"
            />
          </div>
        ))}
      </div>

      {loading && <PinkSpinner />}
    </div>
  );
}
