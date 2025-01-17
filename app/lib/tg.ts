import { TgWebAppData } from "@/types/tg-webapp-data";

export function getTgWebAppData(): TgWebAppData {
  const windowHash = window.location.hash.slice(1);
  const windowParams = new URLSearchParams(windowHash);
  const tgWebAppPlatform = windowParams.get("tgWebAppPlatform");
  const isTgWebAppPlatform = tgWebAppPlatform !== null;
  const tgWebAppData = windowParams.get("tgWebAppData");
  const tgWebAppDataParams = tgWebAppData
    ? new URLSearchParams(tgWebAppData)
    : null;
  const tgWebAppStartParam = tgWebAppDataParams?.get("start_param") || null;
  return {
    isTgWebAppPlatform,
    tgWebAppStartParam,
  };
}
