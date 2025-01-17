"use client";

import { chainConfig } from "@/config/chain";
import { telegramConfig } from "@/config/telegram";
import { getTgWebAppData } from "@/lib/tg";
import { ArgentTMA, SessionAccountInterface } from "@argent/tma-wallet";
import { createContext, useEffect, useState } from "react";
import { RpcProvider } from "starknet";

// Define the type of context value
interface ArgentTMAContextValue {
  isTgWebAppPlatform: boolean | undefined;
  argentTMA: ArgentTMA | undefined;
  account: SessionAccountInterface | undefined;
  setAccount: (account: SessionAccountInterface | undefined) => void;
  // isConnected: boolean;
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
  // const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Define Telegram web data
    const { isTgWebAppPlatform } = getTgWebAppData();
    setIsTgWebAppPlatform(isTgWebAppPlatform);

    // Definte Argent TMA
    if (!isTgWebAppPlatform) {
      return;
    }

    const argentTMA = ArgentTMA.init({
      environment: "sepolia",
      appName: telegramConfig.app.name,
      appTelegramUrl: telegramConfig.app.url,
      sessionParams: {
        allowedMethods: [
          {
            contract: chainConfig.contracts.helloStarknet,
            selector: "increase_balance",
          },
          {
            contract: chainConfig.contracts.erc20Factory,
            selector: "create_erc20",
          },
        ],
        validityDays: 90,
      },
      provider: new RpcProvider({
        nodeUrl: process.env.NEXT_PUBLIC_RPC_PROVIDER_URL,
      }),
    });
    setArgentTMA(argentTMA);
  }, []);

  useEffect(() => {
    // Call connect() as soon as the app is loaded
    argentTMA
      ?.connect()
      .then((res) => {
        if (!res) {
          // Not connected
          // setIsConnected(false);
          return;
        }

        const { account, callbackData } = res;

        if (account.getSessionStatus() !== "VALID") {
          // Session has expired or scope (allowed methods) has changed
          // A new connection request should be triggered

          // The account object is still available to get access to user's address
          // but transactions can't be executed
          const { account } = res;

          setAccount(account);
          // setIsConnected(false);
          return;
        }

        // The session account is returned and can be used to submit transactions
        setAccount(account);
        // setIsConnected(true);

        // Custom data passed to the requestConnection() method is available here
        console.log("Callback data:", callbackData);
      })
      .catch((err) => {
        console.error("Failed to connect:", err);
      });
  }, [argentTMA]);

  return (
    <ArgentTMAContext.Provider
      value={{
        isTgWebAppPlatform,
        argentTMA,
        account,
        setAccount,
      }}
    >
      {children}
    </ArgentTMAContext.Provider>
  );
}
