"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import useArgentTMA from "@/hooks/use-argent-tma";
import useError from "@/hooks/use-error";
import { BotIcon, WalletIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HomeNotConnectedAccountSection() {
  const { argentTMA } = useArgentTMA();
  const { handleError } = useError();

  async function handleConnect() {
    try {
      console.log("Connecting the user...");
      if (!argentTMA) {
        throw new Error("ArgentTMA is undefined");
      }
      await argentTMA?.requestConnection({
        callbackData: "custom_callback",
        approvalRequests: [],
      });
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <main className="container py-6 lg:px-80">
      <div className="flex flex-col items-center max-w-[680px]">
        <Image
          src="/images/cover.png"
          alt="Cover"
          priority={false}
          width="100"
          height="100"
          sizes="100vw"
          className="w-full rounded-xl"
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter max-w-[680px] mt-4">
        Launch buzz tokens faster than anybody else in the universe
      </h1>
      <p className="font-medium tracking-tight text-muted-foreground max-w-[680px] mt-2">
        AI agent that finds ideas for meme or AI tokens based on the hottest
        news and helps you launch those tokens in a few clicks
      </p>
      {argentTMA ? (
        <Button onClick={() => handleConnect()} className="mt-4">
          <WalletIcon /> Connect Argent Wallet
        </Button>
      ) : (
        <Link href={siteConfig.links.bot} target="_blank">
          <Button className="mt-4">
            <BotIcon /> Open Telegram Bot
          </Button>
        </Link>
      )}
    </main>
  );
}
