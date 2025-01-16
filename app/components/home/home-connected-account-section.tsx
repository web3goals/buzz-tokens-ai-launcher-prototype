"use client";

import { Separator } from "@/components/ui/separator";
import { BotIcon, LightbulbIcon, RocketIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { Button } from "../ui/button";
import { siteConfig } from "@/config/site";

export function HomeConnectedAccountSection() {
  return (
    <main className="container py-6 lg:px-80">
      <div className="flex items-center justify-center size-16 rounded-full bg-primary">
        <LightbulbIcon className="text-primary-foreground" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mt-2">
        Launch token
      </h1>
      <Separator className="my-4" />
      <p className="mt-2">
        As soon as the AI agent finds a cool idea to launch a token, you&apos;ll
        get a notification in the Telegram bot
      </p>
      <Link href={siteConfig.links.telegramBot}>
        <Button variant="outline" className="mt-4">
          <BotIcon />
          Open Telegram Bot
        </Button>
      </Link>
      <div className="flex items-center justify-center size-16 rounded-full bg-primary mt-16">
        <RocketIcon className="text-primary-foreground" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mt-2">
        Your launched tokens
      </h1>
      <Separator className="my-4" />
      {/* TODO: Diplay token list */}
      <Skeleton className="h-8" />
    </main>
  );
}
