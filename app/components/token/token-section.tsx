"use client";

import { getToken } from "@/actions/token-action";
import { siteConfig } from "@/config/site";
import { Token } from "@/db/models/token";
import useError from "@/hooks/use-error";
import { toast } from "@/hooks/use-toast";
import { addressToShortAddress } from "@/lib/converters";
import {
  ChartCandlestickIcon,
  CoinsIcon,
  GlobeIcon,
  PlusIcon,
  RefreshCcw,
  ShareIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingSection } from "../loading-section";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function TokenSection(props: { tokenAddress: string }) {
  const { handleError } = useError();
  const [token, setToken] = useState<Token | undefined>();

  useEffect(() => {
    getToken(props.tokenAddress)
      .then((response) => {
        if (response?.data) {
          setToken(JSON.parse(response.data));
        } else {
          throw new Error(response?.error);
        }
      })
      .catch((error) =>
        handleError(error, "Failed to load the token, try again later")
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tokenAddress]);

  if (!token) {
    return <LoadingSection />;
  }

  return (
    <main className="container py-6 lg:px-80">
      {/* Main part */}
      <div>
        <div className="flex items-center justify-center size-20 rounded-full bg-primary">
          <CoinsIcon className="size-8 text-primary-foreground" />
        </div>
        <p className="text-xl font-extrabold mt-2">{token.name}</p>
        <p className="font-medium text-muted-foreground">${token.symbol}</p>
        <p className="text-sm mt-1">{token.description}</p>
        <div className="flex flex-col items-start gap-2 mt-4">
          <Link
            href={`https://t.me/share/url?url=${siteConfig.links.app}?startapp=t_${token.address}`}
            target="_blank"
          >
            <Button variant="default">
              <ShareIcon />
              Share
            </Button>
          </Link>
          <Link
            href={`https://sepolia.voyager.online/contract/${token.address}`}
            target="_blank"
          >
            <Button variant="outline">
              <GlobeIcon /> Open in Explorer
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => toast({ title: "This feature is coming soon 👌" })}
          >
            <PlusIcon /> Add to Wallet
          </Button>
        </div>
      </div>
      <Separator className="my-8" />
      {/* Stats part */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <p className="font-bold">Creator</p>
          <Link
            href={`https://sepolia.voyager.online/contract/${token.creator}`}
            target="_blank"
            className="font-medium underline underline-offset-4"
          >
            <p className="text-sm">{addressToShortAddress(token.creator)}</p>
          </Link>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="font-bold">TVL</p>
          <p className="text-sm">$0.00</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="font-bold">Volume (24h)</p>
          <p className="text-sm">$0.00</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="font-bold">Change (24h)</p>
          <p className="text-sm">+0.00%</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="font-bold">Holders</p>
          <p className="text-sm">1</p>
        </div>
      </div>
      {/* Trading part */}
      <div className="flex flex-col items-start gap-2 mt-4">
        <Button
          variant="default"
          onClick={() => toast({ title: "This feature is coming soon 👌" })}
        >
          <ChartCandlestickIcon /> Open Chart
        </Button>
        <Button
          variant="outline"
          onClick={() => toast({ title: "This feature is coming soon 👌" })}
        >
          <RefreshCcw /> Swap Tokens
        </Button>
      </div>
    </main>
  );
}
