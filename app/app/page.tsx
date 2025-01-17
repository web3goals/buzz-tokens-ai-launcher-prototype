"use client";

import { HomeConnectedAccountSection } from "@/components/home/home-connected-account-section";
import { HomeNotConnectedAccountSection } from "@/components/home/home-not-connected-account-section";
import { LoadingSection } from "@/components/loading-section";
import useArgentTMA from "@/hooks/use-argent-tma";
import { getTgWebAppData } from "@/lib/tg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { argentTMA } = useArgentTMA();
  const router = useRouter();

  // Define Telegram start params for following redirecting
  const { tgWebAppStartParam } = getTgWebAppData();
  const tgStartParamToken = tgWebAppStartParam?.startsWith("t_")
    ? tgWebAppStartParam.slice(2)
    : null;
  const tgStartParamIdea = tgWebAppStartParam?.startsWith("i_")
    ? tgWebAppStartParam.slice(2)
    : null;

  useEffect(() => {
    if (tgStartParamToken) {
      router.push(`/token/${tgStartParamToken}`);
    }
  }, [tgStartParamToken, router]);

  useEffect(() => {
    if (tgStartParamIdea) {
      router.push(`/token/launch/idea/${tgStartParamIdea}`);
    }
  }, [tgStartParamIdea, router]);

  if (
    !tgStartParamToken &&
    !tgStartParamIdea &&
    argentTMA &&
    argentTMA.isConnected()
  ) {
    return <HomeConnectedAccountSection />;
  }

  if (!tgStartParamToken && !tgStartParamIdea) {
    return <HomeNotConnectedAccountSection />;
  }

  return <LoadingSection />;
}
