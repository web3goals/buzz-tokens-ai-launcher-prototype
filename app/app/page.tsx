"use client";

import { LoadingSection } from "@/components/loading-section";
import { getTgWebAppStartParam } from "@/lib/tg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    // Define Telegram start params
    const tgWebAppStartParam = getTgWebAppStartParam(window.location.hash);
    const tgWebAppStartParamToken = tgWebAppStartParam?.startsWith("t_")
      ? tgWebAppStartParam.slice(2)
      : null;
    const tgWebAppStartParamIdea = tgWebAppStartParam?.startsWith("i_")
      ? tgWebAppStartParam.slice(2)
      : null;

    // Redirect to token page
    if (tgWebAppStartParamToken) {
      router.push(`/token/${tgWebAppStartParamToken}`);
    }

    // Redirect to token launch page
    else if (tgWebAppStartParamIdea) {
      router.push(`/token/launch/idea/${tgWebAppStartParamIdea}`);
    }

    // Redirect to home page
    else {
      router.push(`/home`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LoadingSection />;
}
