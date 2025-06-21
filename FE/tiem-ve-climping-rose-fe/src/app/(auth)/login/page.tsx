// app/login/page.tsx (Next.js App Router)
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
// import { useAppDispatch, useAppSelector } from "@/store";
// import { login } from "@/store/authSlice";

export default function LoginPage() {
  // const dispatch = useAppDispatch();
  // const { loading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch(login(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
            Đăng nhập hệ thống
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {/* 
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )} */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
