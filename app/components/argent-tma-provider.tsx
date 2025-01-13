"use client";

import { ArgentTMA, SessionAccountInterface } from "@argent/tma-wallet";
import { createContext, useEffect, useState } from "react";

// Define the type of context value
interface ArgentTMAContextValue {
  argentTMA: ArgentTMA | undefined;
  account: SessionAccountInterface | undefined;
  setAccount: (account: SessionAccountInterface | undefined) => void;
  isConnected: boolean;
}

// Create the context
export const ArgentTMAContext = createContext<
  ArgentTMAContextValue | undefined
>(undefined);

// Create a provider component
export function ArgentTMAProvider({ children }: { children: React.ReactNode }) {
  const [argentTMA, setArgentTMA] = useState<ArgentTMA | undefined>();
  const [account, setAccount] = useState<SessionAccountInterface | undefined>();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // TODO: Fix the allowed methods field
  useEffect(() => {
    const argentTMA = ArgentTMA.init({
      environment: "sepolia",
      appName: "Buzz Tokens AI Launcher App",
      appTelegramUrl: "https://t.me/buzz_tokens_ai_launcher_bot/app",
      sessionParams: {
        allowedMethods: [
          {
            contract:
              "0x036133c88c1954413150db74c26243e2af77170a4032934b275708d84ec5452f",
            selector: "increment",
          },
        ],
        validityDays: 90,
      },
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
          setIsConnected(false);
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
          setIsConnected(false);
          return;
        }

        // The session account is returned and can be used to submit transactions
        setAccount(account);
        setIsConnected(true);

        // Custom data passed to the requestConnection() method is available here
        console.log("Callback data:", callbackData);
      })
      .catch((err) => {
        console.error("Failed to connect:", err);
      });
  }, [argentTMA]);

  return (
    <ArgentTMAContext.Provider
      value={{ argentTMA, account, setAccount, isConnected }}
    >
      {children}
    </ArgentTMAContext.Provider>
  );
}
