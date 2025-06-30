import { getPaitingById } from "@/api/paintingApi";
import AddToCartSection from "@/components/paintings/AddToCartSection";
import PaintingInstruction from "@/components/paintings/PaintingInstruction";
import { Separator } from "@/components/ui/separator";
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
    <div className="p-0">
      <div className="flex flex-col md:flex-row p-0">
        <div className="relative w-full md:w-1/2 aspect-square mt-4">
          <Image
            src={painting.imageUrl}
            alt={painting.name}
            fill
            className="object-cover rounded"
          />
        </div>

        <div className="py-4 md:px-8">
          <h1 className="text-xl lg:text-2xl font-bold text-red-500">
            {painting.name}
          </h1>
          <p className=" md:mt-4 text-gray-700">{painting.paintingId}</p>

          <div className="flex items-center">
            <p className="mt-2 text-red-400 font-bold text-2xl lg:text-3xl">
              ¥{painting.price}
            </p>
          </div>

          <div className="flex gap-4">
            {categories.map((c) => (
              <p
                key={c.categoryId}
                className="bg-red-300 font-semibold p-1 rounded-sm"
              >
                {c.name}
              </p>
            ))}
          </div>
          <p className="mt-2">Số lượng sẵn có: {painting.quantity}</p>

          <AddToCartSection
            paintingId={painting.paintingId}
            stock={painting.quantity}
          />
        </div>
      </div>
      <Separator className="my-6" />

      {/* Mô tả */}
      <PaintingInstruction />
    </div>
  );
}
