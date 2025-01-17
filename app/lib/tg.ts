export function getIsTgWebAppPlatform(windowLocationHash: string): boolean {
  const windowLocationHashParams = new URLSearchParams(
    windowLocationHash.slice(1)
  );
  const tgWebAppPlatform = windowLocationHashParams.get("tgWebAppPlatform");
  return tgWebAppPlatform !== null;
}

export function getTgWebAppStartParam(
  windowLocationHash: string
): string | null {
  const windowLocationHashParams = new URLSearchParams(
    windowLocationHash.slice(1)
  );
  const tgWebAppData = windowLocationHashParams.get("tgWebAppData");
  const tgWebAppDataParams = tgWebAppData
    ? new URLSearchParams(tgWebAppData)
    : null;
  return tgWebAppDataParams?.get("start_param") || null;
}
