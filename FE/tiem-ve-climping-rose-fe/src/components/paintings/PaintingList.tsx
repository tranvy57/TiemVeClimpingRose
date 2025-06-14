import { IPainting } from "@/types/implements/painting";
import { PaitingItem } from "./PaintingItem";

interface PatingsProps {
  paintings: IPainting[];
}
export function PaintingList({ paintings }: PatingsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-4 md:px-4">
      {paintings.map((p) => {
        return (
          <PaitingItem
            key={p.paintingId}
            name={p.name}
            image_url={p.imageUrl}
            price={p.price}
            href="/"
          />
        );
      })}
    </div>
  );
}
