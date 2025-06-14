"use client";

import { PaintingList } from "@/components/paintings/PaintingList";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { Funnel } from "lucide-react";

const sizeOptions = ["20x30", "40x40", "40x50"];
const PaintingsPage = () => {
  const [paintings, setPaintings] = useState<IPainting[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.log("Error happend when fetch categories", error);
    }
  };

  const fetchPaintings = async () => {
    try {
      setLoading(true);
      const response = await getPaintings(page, 20);
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
    <div className=" relative flex flex-col md:flex-row gap-4">
      {/* Filters */}
      <div className="hidden md:flex flex-col gap-4 md:w-48  h-fit sticky md:top-[90px]">
        <Input type="text" placeholder="Search.." />
        <div>
          <p className="text-lg font-semibold mb-2 text-red-500">Kích thước</p>
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
          <p className="text-lg font-semibold mb-2 text-red-500">Danh mục</p>
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
      </div>
      {/* Sheet Mobile */}

      <div className="flex-1 flex flex-col justify-start ">
        <div className="flex justify-between pb-2 md:hidden">
          <p>Từ từ mần thim</p>
          <Sheet>
            <SheetTrigger>
              <Funnel className="md:hidden" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter</SheetTitle>
                <div className="md:hidden flex-col">
                  <Input type="text" placeholder="Search.." />
                  <div>
                    <h2 className=" font-semibold mb-2 text-red-500">
                      Kích thước
                    </h2>
                    <div className="space-y-2">
                      {sizeOptions.map((size) => (
                        <div key={size} className="flex items-center gap-2">
                          <Checkbox
                            id={`size-${size}`}
                            checked={selectedSizes.includes(size)}
                            onCheckedChange={() =>
                              toggleSelection(
                                size,
                                selectedSizes,
                                setSelectedSizes
                              )
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
                    <h2 className=" font-semibold mb-2 text-red-500">
                      Danh mục
                    </h2>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <div
                          key={cat.categoryId}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            id={`cat-${cat.categoryId}`}
                            checked={selectedCategories.includes(
                              cat.categoryId
                            )}
                            onCheckedChange={() =>
                              toggleSelection(
                                cat.categoryId,
                                selectedCategories,
                                setSelectedCategories
                              )
                            }
                          />
                          <label
                            htmlFor={`cat-${cat.categoryId}`}
                            className="text-sm"
                          >
                            {cat.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        {/* paintings */}
        <PaintingList paintings={paintings} />
        {/* paging*/}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={
                      page === 1 ? "opacity-50 pointer-events-none" : ""
                    }
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
                          page === p ? "bg-red-300 text-white" : ""
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
                      page === totalPages
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
      {loading && <PinkSpinner />}
    </div>
  );
};

export default PaintingsPage;
