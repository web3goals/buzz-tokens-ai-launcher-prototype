"use client";

import { chainConfig } from "@/config/chain";
import { telegramConfig } from "@/config/telegram";
import { ArgentTMA, SessionAccountInterface } from "@argent/tma-wallet";
import { useEffect } from "react";
import { RpcProvider } from "starknet";

export default function ArgentTMAController(props: {
  isTgWebAppPlatform: boolean | undefined;
  argentTMA: ArgentTMA | undefined;
  setArgentTMA: (argentTMA: ArgentTMA) => void;
  setAccount: (account: SessionAccountInterface) => void;
  setIsTgWebAppPlatform: (isTgWebAppPlatform: boolean) => void;
}) {
  useEffect(() => {
    // Return if it's not a Telegram Web App platform or Argent TMA already defined
    if (!props.isTgWebAppPlatform || props.argentTMA) {
      return;
    }

    // Init Argent TMA
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
    props.setArgentTMA(argentTMA);

    // Connect to ArgentTMA
    argentTMA
      .connect()
      .then((res) => {
        if (!res) {
          // Not connected
          return;
        }

        const { account, callbackData } = res;

        if (account.getSessionStatus() !== "VALID") {
          // Session has expired or scope (allowed methods) has changed
          // A new connection request should be triggered

          // The account object is still available to get access to user's address
          // but transactions can't be executed
          const { account } = res;

          props.setAccount(account);
          return;
        }

        // The session account is returned and can be used to submit transactions
        props.setAccount(account);

        // Custom data passed to the requestConnection() method is available here
        console.log("Callback data:", callbackData);
      })
      .catch((err) => {
        console.error("Failed to connect:", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
