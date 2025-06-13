"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PinkSpinner from "@/components/ui/pink-spiner";
import { getCategories } from "@/features/categories/categoryApi";
import { getPaintings } from "@/features/paintings/paintingApi";
import { ICategory, IPainting } from "@/types/implements/painting";
import { getVisiblePages } from "@/utils/helper";
import React, { useEffect, useState } from "react";

const sizeOptions = ["20x30", "40x40", "40x50"];
const PaintingsPage = () => {
  const [paintings, setPaintings] = useState<IPainting[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategories();
      if (response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.log("Error happend when fetch categories", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaintings = async () => {
    try {
      setLoading(true);
      const response = await getPaintings(page, 9);
      if (response.data) {
        setPaintings(response.data.items);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.log("Error happend when fetch paitings", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPaintings();
  }, [page]);

  const toggleSelection = (
    value: string,
    list: string[],
    setList: (val: string[]) => void
  ) => {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6">
      <aside className="md:w-64 space-y-6">
        <Input type="text" placeholder="Search.." />
        <div>
          <h2 className="text-lg font-semibold mb-2">Kích thước</h2>
          <div className="space-y-2">
            {sizeOptions.map((size) => (
              <div key={size} className="flex items-center gap-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={() =>
                    toggleSelection(size, selectedSizes, setSelectedSizes)
                  }
                />
                <label htmlFor={`size-${size}`} className="text-sm">
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Danh mục</h2>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div key={cat.categoryId} className="flex items-center gap-2">
                <Checkbox
                  id={`cat-${cat.categoryId}`}
                  checked={selectedCategories.includes(cat.categoryId)}
                  onCheckedChange={() =>
                    toggleSelection(
                      cat.categoryId,
                      selectedCategories,
                      setSelectedCategories
                    )
                  }
                />
                <label htmlFor={`cat-${cat.categoryId}`} className="text-sm">
                  {cat.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={page === 1 ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>

              {getVisiblePages(page, totalPages).map((p, i) => (
                <PaginationItem key={i}>
                  {p === "..." ? (
                    <span className="px-2 text-gray-500">...</span>
                  ) : (
                    <button
                      onClick={() => setPage(p as number)}
                      className={`px-3 py-1 border rounded ${
                        page === p ? "bg-black text-white" : ""
                      }`}
                    >
                      {p}
                    </button>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  className={
                    page === totalPages ? "opacity-50 pointer-events-none" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {loading && <PinkSpinner />}
    </div>
  );
};

export default PaintingsPage;
