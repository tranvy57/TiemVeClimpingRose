"use client";

import React from "react";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { CategoryItem } from "./CategoryItem";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  {
    categoryId: "685cd7ae-4c75-4b8f-8841-8cb61c6ae938",
    title: "Tranh Phật",
    description: "Mang đến sự an yên, tĩnh lặng và giá trị tâm linh sâu sắc.",
    image_url:
      "https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/491949590_122180887778290227_4962776753592286186_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEYZ--hYAx36FAzb0jhBMWOs3QyNNDzEk-zdDI00PMST-YdULRgvqQVmM3AzXsDBhNP_CRP0JE_2oTMGWM2t-1D&_nc_ohc=Fuk8iSs1g8kQ7kNvwFG-yBF&_nc_oc=AdmmizetU99gYuwK2dyUV9u82Z8LxecJsWOUPqx9ETPExkP3ZOhcx93Neqg8zz-iTrg&_nc_zt=23&_nc_ht=scontent.fsgn5-8.fna&_nc_gid=V8rd_-Qw0VTY6s5RKiNFcA&oh=00_AfOmgjMJP9qy7d4v1cVcp99GGL45-0shhpVTvmIRiFRkRg&oe=68586954",
    slug: "tranh-phat",
  },
  {
    categoryId: "685cd7ae-4c75-4b8f-8841-8cb61c6ae938",

    title: "Tranh thiên nhiên",
    description: "Tái hiện vẻ đẹp trong lành, tự do và thanh mát của đất trời.",
    image_url:
      "https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/502661289_122187590942290227_9084312066762423372_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE8L7U50oXfMHVw0iqpQP02BuesvGl3lv4G56y8aXeW_rUH-Gw4GtE12x85S1FALoE11Fj16NMX0TIfqhzFZkXK&_nc_ohc=9BQFG94NJMwQ7kNvwEgyGVF&_nc_oc=Adn6L9xfok0Gtv7b9TAA1z-tGfnFVz3DUFEc-SqD0eJbSwMzTEaECh7Gk_h_brRTuMU&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=V-rMvOUniuONHRgPVdM7zA&oh=00_AfP_M1j7wqt0vg3lke0KxtXWT24UwfYqeGNVx_90suzuFQ&oe=68588ADD",
    slug: "thien-nhien",
  },
  {
    categoryId: "685cd7ae-4c75-4b8f-8841-8cb61c6ae938",

    title: "Tranh thiếu nữ",
    description:
      "Dịu dàng, tinh khôi và đầy cảm xúc – tranh thiếu nữ là biểu tượng của nét đẹp nữ tính.",
    image_url:
      "https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/504083051_122188135388290227_5589182436718800870_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG2qnjWjoT9KEjtN8L0MPNE_YFwEScPO1X9gXARJw87VT-we0I8lpGLhCO5saw26si2LGRG3aPE-NLBCqFQf2L5&_nc_ohc=-yPygtrPS9sQ7kNvwFqChOr&_nc_oc=Adlgdl-2XH9xRNq2pk6nPl_kgEzGzm4eiws8V9mp7jtVZ-L9eXedz1gsmbziXHGxvBA&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=osrCToyTjRgFkEhbhSDp6Q&oh=00_AfNQmvzytzg3JyfyTR5RQAlObVRayIUfHsZIihCNoksbTg&oe=68586B57",
    slug: "thieu-nu",
  },
  {
    categoryId: "685cd7ae-4c75-4b8f-8841-8cb61c6ae938",

    title: "Tranh cặp đôi",
    description:
      "Biểu tượng của sự gắn kết, ấm áp và yêu thương – lý tưởng để tặng người thương hoặc trang trí phòng đôi.",
    image_url:
      "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/500129138_122186766236290227_1297338233908458138_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEw7eM1aA3DLbOnxXLLVTY9mB6PJ6Lw7d2YHo8novDt3chiI1SxcFRaPs4PpQt7DPb9Tgg6VWmQsiKM1JlVmbPb&_nc_ohc=okrtRlmqw1AQ7kNvwECVILY&_nc_oc=Adm6raqlmM9pT1A9jhH-KHlXO58SSvp7r_kyG2Ynvjl3zh9C9titpTOBJcTDiXxjO-Y&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=_EDb6NT-OiQKSx2VDJNLEw&oh=00_AfNcVflQ0hYzf6G-ouUX8qFdLU4o5tmR5gA8IiKjHD_DFw&oe=685872DB",
    slug: "cap-doi",
  },
];

export function CategoryList() {
  const t = useTranslations("home");
  const router = useRouter();

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
        <Link href="#" className="font-normal text-red-400 underline">
          {t("seemore")}
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:gap-10 lg:gap-16 md:px-4 mt-4 md:mt-10">
        {CATEGORIES.map((cat) => (
          <div key={cat.slug} onClick={() => handleClick(cat.categoryId)}>
            <CategoryItem
              title={cat.title}
              description={cat.description}
              image_url={cat.image_url}
              href="#"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
