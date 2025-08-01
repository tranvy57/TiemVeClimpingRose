import { Metadata, ResolvingMetadata } from "next";
import PaintingDetailContent from "./PaintingDetailContent";
import { getPaitingById } from "@/api/paintingApi";
import { IPainting } from "@/types/implements/painting";

// app/painting/[id]/page.tsx

interface PaintingDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PaintingDetailPage({
  params,
}: PaintingDetailPageProps) {
  const { id } = await params;
  return <PaintingDetailContent id={id} />;
}
