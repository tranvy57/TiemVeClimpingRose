import { getPaitingById } from "@/api/paintingApi";
import AddToCartSection from "@/components/paintings/AddToCartSection";
import { ICategory, IPainting } from "@/types/implements/painting";
import { BadgeJapaneseYen } from "lucide-react";
import Image from "next/image";

interface PaintingDetailContentProps {
  id: string;
}
export default async function PaintingDetailContent({
  id,
}: PaintingDetailContentProps) {
  const res = await getPaitingById(id);

  if (!res.data) {
    return <p className="text-center mt-10">Không tìm thấy tranh</p>;
  }

  const painting: IPainting = res.data;
  const categories: ICategory[] = painting.categories;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="relative w-full md:w-1/2 aspect-square mt-4">
        <Image
          src={painting.imageUrl}
          alt={painting.name}
          fill
          className="object-cover rounded"
        />
      </div>

      <div className="py-4 md:px-8">
        <h1 className="text-2xl lg:text-4xl font-bold text-red-500">
          {painting.name}
        </h1>
        <p className="mt-1 md:mt-4 text-gray-700">{painting.paintingId}</p>

        <div className="flex items-center">
          <BadgeJapaneseYen className="text-red-500" />
          <p className="mt-2 text-red-400 text-3xl">{painting.price}</p>
        </div>

        <p className="mt-2">Số lượng sẵn có: {painting.quantity}</p>

        {categories.map((c) => (
          <div key={c.categoryId}>
            <p>{c.name}</p>
          </div>
        ))}

        <AddToCartSection
          paintingId={painting.paintingId}
          stock={painting.quantity}
        />
      </div>
    </div>
  );
}
