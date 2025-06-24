// lib/toast.ts
import { toast } from "sonner";
import { Ban, Check } from "lucide-react";

export const showSuccess = (message: string) =>
  toast.success(message, {
    icon: <Check className="text-pink-500 w-4 h-4" />,
    className: "bg-pink-100 text-pink-700 text-xs max-w-[220px]",
  });

export const showError = (message: string) =>
  toast.error(message, {
    icon: <Ban className="text-red-500 w-4 h-4" />,
    className: "bg-red-100 text-red-700 text-xs max-w-[220px]",
  });
