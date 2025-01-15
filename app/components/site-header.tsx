"use client";

import { siteConfig } from "@/config/site";
import useArgentTMA from "@/hooks/use-argent-tma";
import { addressToShortAddress } from "@/lib/converters";
import {
  BotIcon,
  GithubIcon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  RabbitIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function SiteHeader() {
  const { argentTMA, account, setAccount } = useArgentTMA();

  async function handleDisconnect() {
    console.log("Disconnecting the user...");
    await argentTMA?.clearSession();
    setAccount(undefined);
  }

  return (
    <header className="sticky top-0 z-40 bg-card border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        {/* Left part */}
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center size-8 bg-primary rounded-full">
              <RabbitIcon className="text-primary-foreground size-4" />
            </div>
            <span className="text-primary font-bold">{siteConfig.name}</span>
          </Link>
        </div>
        {/* Right part */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="text-sm font-medium text-muted-foreground"
              asChild
            >
              <Button variant="ghost" size="icon">
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="/">
                <DropdownMenuItem>
                  <HouseIcon className="size-4 mr-2" />
                  <span>Home Page</span>
                </DropdownMenuItem>
              </Link>
              <Link href={siteConfig.links.telegramBot} target="_blank">
                <DropdownMenuItem>
                  <BotIcon className="size-4 mr-2" />
                  <span>Telegram Bot</span>
                </DropdownMenuItem>
              </Link>
              <Link href={siteConfig.links.github} target="_blank">
                <DropdownMenuItem>
                  <GithubIcon className="size-4 mr-2" />
                  <span>GitHub</span>
                </DropdownMenuItem>
              </Link>
              {argentTMA && argentTMA.isConnected() && (
                <div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleDisconnect()}>
                    <LogOutIcon className="size-4 mr-2" />
                    <span>
                      Disconnect ({addressToShortAddress(account?.address)})
                    </span>
                  </DropdownMenuItem>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
