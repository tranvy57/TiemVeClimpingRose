import { getPaitingById } from "@/api/paintingApi";
import AddToCartSection from "@/components/paintings/AddToCartSection";
import PaintingInstruction from "@/components/paintings/PaintingInstruction";
import { Separator } from "@/components/ui/separator";
import { ICategory, IPainting } from "@/types/implements/painting";
import { BadgeJapaneseYen, Check, Copy, Truck } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CopyIcon from "@/components/paintings/CopyButton";

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

        <div className="py-4 md:px-8 w-full md:w-1/2">
          <h1 className="text-xl lg:text-2xl font-bold text-red-500">
            {painting.name}
          </h1>
          <p className=" md:mt-4 text-gray-700">
            Mã sản phẩm: {painting.paintingId}
          </p>

          <div className="flex items-center">
            <p className="mt-2 text-red-400 font-bold text-2xl lg:text-2xl mb-2">
              ¥{painting.price.toLocaleString("ja-JP")}
            </p>
          </div>
          <div className="font-light w-fit rounded-xl border text-sm p-1 mb-3">
            {painting.size}
          </div>
          <div className="flex gap-4">
            {categories.map((c) => (
              <p
                key={c.categoryId}
                className="bg-red-400 font-semibold px-2 py-1 text-white rounded-xl"
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
          <Separator className="my-4" />
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger>
                <div className="flex items-center gap-2 text-sm cursor-pointer underline">
                  {" "}
                  <Truck /> Vận chuyển{" "}
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Bảng giá vận chuyển</DialogTitle>
                  <DialogDescription>
                    <div className="w-full flex justify-center">
                      <Image
                        src={"/ship.jpg"}
                        alt="Shipping"
                        width={300}
                        height={200}
                        className="rounded"
                      />
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <CopyIcon />
          </div>
          <p className="text-gray-500">{painting.description}</p>
        </div>
      </div>
      <Separator className="my-6" />

      {/* Mô tả */}
      <PaintingInstruction />
    </div>
  );
}
