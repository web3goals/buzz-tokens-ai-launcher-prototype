"use client";

import { ArgentTMA, SessionAccountInterface } from "@argent/tma-wallet";
import { useEffect, useState } from "react";

export default function Home() {
  const argentTMA = ArgentTMA.init({
    environment: "sepolia", // "sepolia" | "mainnet" (Whitelisting required)
    appName: "Buzz Tokens AI Launcher App", // Your Telegram app name
    appTelegramUrl: "https://t.me/buzz_tokens_ai_launcher_bot/app", // Your Telegram app URL
    sessionParams: {
      allowedMethods: [
        {
          contract:
            "0x036133c88c1954413150db74c26243e2af77170a4032934b275708d84ec5452f",
          selector: "increment",
        },
      ],
      validityDays: 90, // session validity (in days) - default: 90
    },
  });

  const [account, setAccount] = useState<SessionAccountInterface | undefined>();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  async function handleCheckConnection() {
    console.log("Checking if the user is connected...");
    const isConnected = argentTMA.isConnected();
    console.log({ isConnected });
  }

  async function handleConnect() {
    console.log("Connecting the user...");
    await argentTMA.requestConnection({
      callbackData: "custom_callback",
      approvalRequests: [],
    });
  }

  async function handleClearSessionButton() {
    await argentTMA.clearSession();
    setAccount(undefined);
  }

  useEffect(() => {
    // Call connect() as soon as the app is loaded
    argentTMA
      .connect()
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
        console.log("callback data:", callbackData);
      })
      .catch((err) => {
        console.error("Failed to connect", err);
      });
  }, [argentTMA]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p>Connected: {isConnected ? "True" : "False"}</p>
      <p>Account: {JSON.stringify(account)}</p>
      <div className="flex flex-col gap-2 mt-4">
        <button
          className="rounded-md bg-foreground text-background py-2 px-4"
          onClick={() => handleCheckConnection()}
        >
          Check Connection
        </button>
        <button
          className="rounded-md bg-foreground text-background py-2 px-4"
          onClick={() => handleConnect()}
        >
          Connect
        </button>
        <button
          className="rounded-md bg-foreground text-background py-2 px-4"
          onClick={() => handleClearSessionButton()}
        >
          Clear Session
        </button>
      </div>
    </div>
  );
}
