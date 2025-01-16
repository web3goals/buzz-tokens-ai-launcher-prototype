"use client;";

import { Token } from "@/db/models/token";
import { CoinsIcon, MoveRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export function TokenCard(props: { token: Token }) {
  return (
    <div className="w-full flex flex-row gap-4 border rounded px-4 py-6">
      <div className="flex items-center justify-center size-14 rounded-full bg-secondary">
        <CoinsIcon className="size-6 text-primary" />
      </div>
      <div>
        <p className="font-extrabold">{props.token.name}</p>
        <p className="text-sm text-muted-foreground">${props.token.symbol}</p>
        <Link href={`/token/${props.token.address}`}>
          <Button variant="outline" className="mt-4">
            <MoveRightIcon />
            Open
          </Button>
        </Link>
      </div>
    </div>
  );
}
