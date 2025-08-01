"use client";
import { IPainting } from "@/types/implements/painting";
import { PaitingItem } from "./PaintingItem";

interface PatingsProps {
  paintings: IPainting[];
}
export function PaintingList({ paintings }: PatingsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 lg:gap-4 gap-2 md:px-4">
      {paintings.map((p) => {
        if (p.quantity == 0) return null;
        if (p.active == false) return null;

        return (
          <PaitingItem
            key={p.paintingId}
            paintingId={p.paintingId}
            name={p.name}
            image_url={p.imageUrl}
            price={p.price}
            href={`/paintings/${p.paintingId}`}
            size={p.size}
          />
        );
      })}
    </div>
  );
}
