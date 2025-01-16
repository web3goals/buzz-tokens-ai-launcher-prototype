"use client";

import { getTokenIdea } from "@/actions/token-idea-actions";
import { TokenIdea } from "@/db/models/token-idea";
import useError from "@/hooks/use-error";
import { RocketIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { LoadingSection } from "../loading-section";
import { Separator } from "../ui/separator";
import { TokenLaunchForm } from "./token-launch-form";

export function TokenLaunchSection(props: { tokenIdeaId: string }) {
  const { handleError } = useError();
  const [tokenIdea, setTokenIdea] = useState<TokenIdea | undefined>();

  useEffect(() => {
    getTokenIdea(props.tokenIdeaId)
      .then((response) => {
        if (response?.data) {
          setTokenIdea(JSON.parse(response.data));
        } else {
          throw new Error(response?.error);
        }
      })
      .catch((error) =>
        handleError(error, "Failed to load the token idea, try again later")
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tokenIdeaId]);

  if (!tokenIdea) {
    return <LoadingSection />;
  }

  return (
    <main className="container py-6 lg:px-80">
      <div className="flex items-center justify-center size-16 rounded-full bg-primary">
        <RocketIcon className="text-primary-foreground" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mt-2">
        Launch token
      </h1>
      <Separator className="my-4" />
      <TokenLaunchForm tokenIdea={tokenIdea} />
    </main>
  );
}
