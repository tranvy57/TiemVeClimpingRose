"use client";

import { PaintingList } from "@/components/paintings/PaintingList";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { getCategories } from "@/api/categoryApi";
import { getPaintings } from "@/api/paintingApi";
import { ICategory, IPainting } from "@/types/implements/painting";
import { getVisiblePages } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { Funnel, Search } from "lucide-react";
import { log } from "console";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";

const sizeOptions = ["20x20", "30x40", "40x50", "ART_SUPPLIES"];
const PaintingsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [initialized, setInitialized] = useState(false); // NEW: track khi state đã được gán từ URL

  const [paintings, setPaintings] = useState<IPainting[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("created-desc");

  //func fetch categories
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

  //func fetch patings
  const fetchPaintings = async () => {
    try {
      setLoading(true);
      const response = await getPaintings(
        page,
        20,
        selectedCategoryIds,
        selectedSizes,
        true,
        "",
        sort
      );
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

  //  filter từ URL
  useEffect(() => {
    // lấy tất cả category & size từ URL (cho phép nhiều)
    const categoryList = searchParams.getAll("category");
    const sizeList = searchParams.getAll("size");
    const pageParam = searchParams.get("page");
    const pageFromUrl = pageParam ? parseInt(pageParam) : 1;
    const sortParam = searchParams.get("sort");

    const hasFilter = categoryList.length > 0 || sizeList.length > 0;

    if (categoryList.length > 0) {
      setSelectedCategoryIds(categoryList);
    }

    if (sizeList.length > 0) {
      setSelectedSizes(sizeList);
    }

    if (sortParam) {
      setSort(sortParam);
    }

    setPage(pageFromUrl);

    setInitialized(true);
  }, []);

  //push param vào url để người dùng có thể gửi link kèm filter
  useEffect(() => {
    const query = new URLSearchParams();

    selectedCategoryIds.forEach((id) => {
      query.append("category", id);
    });

    selectedSizes.forEach((size) => {
      query.append("size", size);
    });

    if (page > 1) query.set("page", String(page));
    if (sort && sort !== "created-desc") query.set("sort", sort);

    router.push(`/paintings?${query.toString()}`);
  }, [selectedSizes, selectedCategoryIds, page, sort]);

  //fectch category
  useEffect(() => {
    fetchCategories();
  }, []);

  //fetch paitings
  useEffect(() => {
    if (!initialized) return;
    fetchPaintings();
  }, [page, selectedCategoryIds, selectedSizes, sort, initialized]);

  const toggleSelection = (
    value: string,
    list: string[],
    setList: (val: string[]) => void
  ) => {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
    // console.log("List: ", list);
  };

  // const handleSearch = () => {
  //   setKeyword(inputValue);
  //   fetchPaintings();
  // };

  return (
    <div className=" relative flex flex-col md:flex-row gap-4">
      {/* Filters */}
      <div className="hidden md:flex flex-col gap-4 md:w-[15%]  h-fit sticky md:top-[65px]">
        {/* <div className="flex justify-between items-center gap-1">
          <Input
            type="text"
            placeholder="Search.."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button className="py-0" onClick={handleSearch}>
            <Search />
          </Button>
        </div> */}
        <div className="w-full">
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sắp xếp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created-desc">Mới nhất</SelectItem>
              <SelectItem value="created-asc">Cũ nhất</SelectItem>
              <SelectItem value="price-asc">Giá tăng dần</SelectItem>
              <SelectItem value="price-desc">Giá giảm dần</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="text-lg font-semibold mb-2 text-red-500">Kích thước</p>
          <div className="space-y-2">
            {sizeOptions.map((size) => (
              <div key={size} className="flex items-center gap-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={selectedSizes.includes("SIZE_" + size)}
                  onCheckedChange={() =>
                    toggleSelection(
                      "SIZE_" + size,
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
          <p className="text-lg font-semibold mb-2 text-red-500">Danh mục</p>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div key={cat.categoryId} className="flex items-center gap-2">
                <Checkbox
                  id={`cat-${cat.categoryId}`}
                  checked={selectedCategoryIds.includes(cat.categoryId)}
                  onCheckedChange={() =>
                    toggleSelection(
                      cat.categoryId,
                      selectedCategoryIds,
                      setSelectedCategoryIds
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

      <div className="flex-1 flex flex-col justify-start gap">
        <div className="flex justify-between pb-2 md:hidden gap-4">
          <div className="flex-1">
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created-desc">Mới nhất</SelectItem>
                <SelectItem value="created-asc">Cũ nhất</SelectItem>
                <SelectItem value="price-asc">Giá tăng dần</SelectItem>
                <SelectItem value="price-desc">Giá giảm dần</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Sheet>
            <SheetTrigger>
              <Funnel className="md:hidden" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter</SheetTitle>
                <div className="md:hidden flex-col">
                  {/* <div className="flex justify-between items-center gap-1">
                    <Input
                      type="text"
                      placeholder="Search.."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button className="py-0" onClick={handleSearch}>
                      <Search />
                    </Button>
                  </div> */}

                  <div>
                    <h2 className=" font-semibold mb-2 text-red-500">
                      Kích thước
                    </h2>
                    <div className="space-y-2">
                      {sizeOptions.map((size) => (
                        <div key={size} className="flex items-center gap-2">
                          <Checkbox
                            id={`size-${size}`}
                            checked={selectedSizes.includes("SIZE_" + size)}
                            onCheckedChange={() =>
                              toggleSelection(
                                "SIZE_" + size,
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
                            checked={selectedCategoryIds.includes(
                              cat.categoryId
                            )}
                            onCheckedChange={() =>
                              toggleSelection(
                                cat.categoryId,
                                selectedCategoryIds,
                                setSelectedCategoryIds
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
