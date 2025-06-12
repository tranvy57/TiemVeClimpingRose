"use client";

import { store } from "@/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={store}> {children}</Provider>;
}
