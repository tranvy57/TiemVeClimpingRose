"use client";

import { getPaintings } from "@/api/paintingApi";
import { IPainting } from "@/types/implements/painting";
import React, { useEffect, useState } from "react";
import { PaintingList } from "../paintings/PaintingList";
import PinkSpinner from "../ui/pink-spiner";
import { PaitingItem } from "../paintings/PaintingItem";
import Link from "next/link";

const NewPaintings = () => {
  const [paintings, setPaintings] = useState<IPainting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPaintings = async () => {
    try {
      setLoading(true);
      const response = await getPaintings(1, 12, [], [], true, "", "");
      if (response.data) {
        setPaintings(response.data.items);
      }
    } catch (error) {
      console.log("Error happend when fetch paitings", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaintings();
  }, []);

  return (
    <div className="h-fit bg-white py-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-md md:text-xl font-bold underline decoration-red-500 underline-offset-8">
          Sản phẩm mới nhất
        </p>
        <Link href="/paintings" className="font-normal text-red-400 underline">
          <p> Xem tất cả</p>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 gap-2 md:px-4">
        {paintings.map((p) => {
          // console.log("paintingId:", p.paintingId);
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
      {loading && <PinkSpinner />}
    </div>
  );
};

export default NewPaintings;
