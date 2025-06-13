"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { getCategories } from "@/features/categories/categoryApi";
import { ICategory, IPainting } from "@/types/implements/painting";
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
      const response = await getCategories();
      if (response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.log("Error happend when fetch categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
    </div>
  );
};

export default PaintingsPage;
