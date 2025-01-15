"use client";

import { LoadingSection } from "@/components/loading-section";
import { TokenLaunchSection } from "@/components/token/token-launch-section";
import { useParams } from "next/navigation";

export default function TokenLaunchPage() {
  const { id } = useParams();

  if (!id) {
    return <LoadingSection />;
  }

  return <TokenLaunchSection tokenIdeaId={id as string} />;
}
