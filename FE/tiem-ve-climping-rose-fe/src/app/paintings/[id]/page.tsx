import { Suspense } from "react";
import PaintingDetailContent from "./PaintingDetailContent";

interface PaintingDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PaintingDetailPage({
  params,
}: PaintingDetailPageProps) {
  const { id } = await params;
  return <PaintingDetailContent id={id} />;
}
