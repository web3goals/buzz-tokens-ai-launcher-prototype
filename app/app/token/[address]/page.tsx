"use client";

import { LoadingSection } from "@/components/loading-section";
import { TokenSection } from "@/components/token/token-section";
import { useParams } from "next/navigation";

export default function TokenPage() {
  const { address } = useParams();

  if (!address) {
    return <LoadingSection />;
  }

  return <TokenSection tokenAddress={address as string} />;
}
