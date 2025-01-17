"use client";

import { HomeConnectedAccountSection } from "@/components/home/home-connected-account-section";
import { HomeNotConnectedAccountSection } from "@/components/home/home-not-connected-account-section";
import useArgentTMA from "@/hooks/use-argent-tma";

export default function HomePage() {
  const { argentTMA } = useArgentTMA();

  if (argentTMA && argentTMA.isConnected()) {
    return <HomeConnectedAccountSection />;
  }

  return <HomeNotConnectedAccountSection />;
}
