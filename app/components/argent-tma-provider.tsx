"use client";

import { getIsTgWebAppPlatform } from "@/lib/tg";
import { ArgentTMA, SessionAccountInterface } from "@argent/tma-wallet";
import dynamic from "next/dynamic";
import { createContext, useEffect, useState } from "react";

// Define the type of context value
interface ArgentTMAContextValue {
  argentTMA: ArgentTMA | undefined;
  account: SessionAccountInterface | undefined;
  setAccount: (account: SessionAccountInterface | undefined) => void;
}

// Create the context
export const ArgentTMAContext = createContext<
  ArgentTMAContextValue | undefined
>(undefined);

// Create a provider component
export function ArgentTMAProvider({ children }: { children: React.ReactNode }) {
  const [isTgWebAppPlatform, setIsTgWebAppPlatform] = useState<
    boolean | undefined
  >();
  const [argentTMA, setArgentTMA] = useState<ArgentTMA | undefined>();
  const [account, setAccount] = useState<SessionAccountInterface | undefined>();

  const DynamicArgentTMAController = dynamic(
    () => import("../components/argent-tma-controller"),
    {
      ssr: false,
    }
  );

  useEffect(() => {
    const isTgWebAppPlatform = getIsTgWebAppPlatform(window.location.hash);
    setIsTgWebAppPlatform(isTgWebAppPlatform);
  }, []);

  return (
    <ArgentTMAContext.Provider
      value={{
        argentTMA,
        account,
        setAccount,
      }}
    >
      <DynamicArgentTMAController
        isTgWebAppPlatform={isTgWebAppPlatform}
        argentTMA={argentTMA}
        setArgentTMA={setArgentTMA}
        setAccount={setAccount}
        setIsTgWebAppPlatform={setIsTgWebAppPlatform}
      />
      {children}
    </ArgentTMAContext.Provider>
  );
}
