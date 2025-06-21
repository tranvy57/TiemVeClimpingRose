"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface QuantitySelectorProps {
  max: number;
  onChange?: (quantity: number) => void;
}

export default function QuantitySelector({
  max,
  onChange,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (value: number) => {
    const next = Math.max(1, Math.min(value, max));
    setQuantity(next);
    onChange?.(next);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) updateQuantity(val);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => updateQuantity(quantity - 1)}
        disabled={quantity <= 1}
        className="h-9 w-9 rounded-md bg-red-400"
      >
        <Minus className="w-4 h-4 text-white" />
      </Button>

      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={1}
        max={max}
        className="w-12 text-center border rounded-md text-sm py-1"
      />

      <Button
        variant="ghost"
        size="icon"
        onClick={() => updateQuantity(quantity + 1)}
        disabled={quantity >= max}
        className="h-9 w-9 rounded-md bg-red-400"
      >
        <Plus className="w-4 h-4 text-white" />
      </Button>
    </div>
  );
}
