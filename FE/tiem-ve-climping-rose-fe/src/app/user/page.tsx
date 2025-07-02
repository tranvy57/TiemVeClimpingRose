"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export default function UserAccountPage() {
  const [selected, setSelected] = useState<"profile" | "orders">("profile");

  return (
    <div className="w-full px-4 md:px-6 py-10">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-6">
        {/* Sidebar – chỉ hiện trên desktop */}
        <aside className="hidden md:block w-64 shrink-0 border-r pr-4">
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => setSelected("profile")}
              className={`text-left px-4 py-2 rounded-md ${
                selected === "profile"
                  ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              Thông tin tài khoản
            </button>
            <button
              onClick={() => setSelected("orders")}
              className={`text-left px-4 py-2 rounded-md ${
                selected === "orders"
                  ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              Đơn hàng đã đặt
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {/* Desktop – theo tab */}
          <div className="hidden md:block">
            {selected === "profile" && (
              <section>
                <h2 className="text-xl font-semibold mb-4">
                  Thông tin tài khoản
                </h2>
                <p>Họ tên: Nguyễn Văn A</p>
                <p>Email: email@example.com</p>
                <p>SĐT: 0123456789</p>
              </section>
            )}
            {selected === "orders" && (
              <section>
                <h2 className="text-xl font-semibold mb-4">Đơn hàng đã đặt</h2>
                <ul className="space-y-2">
                  <li>✅ Đơn hàng #001 - Giao thành công</li>
                  <li>🚚 Đơn hàng #002 - Đang giao</li>
                </ul>
              </section>
            )}
          </div>

          {/* Mobile – collapsible */}
          <div className="md:hidden space-y-4">
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md font-medium">
                <span>Thông tin tài khoản</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 px-4">
                <p>Họ tên: Nguyễn Văn A</p>
                <p>Email: email@example.com</p>
                <p>SĐT: 0123456789</p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md font-medium">
                <span>Đơn hàng đã đặt</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 px-4">
                <ul className="space-y-2">
                  <li>✅ Đơn hàng #001 - Giao thành công</li>
                  <li>🚚 Đơn hàng #002 - Đang giao</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </main>
      </div>
    </div>
  );
}
