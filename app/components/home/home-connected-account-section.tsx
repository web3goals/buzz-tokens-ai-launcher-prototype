"use client";

import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { Token } from "@/db/models/token";
import { BotIcon, LightbulbIcon, RocketIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import EntityList from "../entity-list";
import { TokenCard } from "../token/token-card";
import { Button } from "../ui/button";
import { getTokens } from "@/actions/token-action";
import useArgentTMA from "@/hooks/use-argent-tma";
import useError from "@/hooks/use-error";

export function HomeConnectedAccountSection() {
  const { handleError } = useError();
  const { account } = useArgentTMA();
  const [tokens, setTokens] = useState<Token[] | undefined>();

  useEffect(() => {
    if (account) {
      getTokens(account.address)
        .then((response) => {
          if (response?.data) {
            setTokens(JSON.parse(response.data));
          } else {
            throw new Error(response?.error);
          }
        })
        .catch((error) =>
          handleError(error, "Failed to load tokens, try again later")
        );
    } else {
      setTokens([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

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
        get a notification in the Telegram bot 🔔
      </p>
      <Link href={siteConfig.links.bot}>
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
      <EntityList
        entities={tokens}
        renderEntityCard={(token, index) => (
          <TokenCard key={index} token={token as Token} />
        )}
        noEntitiesText="No tokens 🍃"
      />
    </main>
  );
}
