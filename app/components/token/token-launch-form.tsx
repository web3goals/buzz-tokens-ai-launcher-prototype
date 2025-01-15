"use client";

import { TokenIdea } from "@/db/models/token-idea";
import useError from "@/hooks/use-error";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLinkIcon, Loader2Icon, RocketIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export function TokenLaunchForm(props: { tokenIdea: TokenIdea }) {
  const { handleError } = useError();
  const [isProsessing, setIsProsessing] = useState(false);

  const formSchema = z.object({
    name: z.string().min(3),
    symbol: z.string().min(3),
    description: z.string().min(3),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.tokenIdea.name,
      symbol: props.tokenIdea.symbol,
      description: props.tokenIdea.description,
    },
  });

  // TODO: Implement
  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsProsessing(true);
      console.log({ values });
      // TODO: Check if account connected
      // TODO: Use contract
      toast({
        title: "Awesome 🤘",
        description: "Token launched",
      });
      // TODO: Redirect to token page
    } catch (error) {
      handleError(error, "Failed to submit the form, try again later");
      setIsProsessing(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Bitcoin"
                  disabled={isProsessing}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Symbol *</FormLabel>
              <FormControl>
                <Input placeholder="BTC" disabled={isProsessing} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Bitcoin is the first decentralized cryptocurrency..."
                  rows={10}
                  disabled={isProsessing}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="default" disabled={isProsessing}>
          {isProsessing ? (
            <Loader2Icon className="size-4 mr-2 animate-spin" />
          ) : (
            <RocketIcon className="size-4 mr-2" />
          )}
          Launch token
        </Button>
      </form>
      <Link href={props.tokenIdea.newsUrl} target="_blank">
        <Button variant="outline" disabled={isProsessing} className="mt-2">
          <ExternalLinkIcon className="size-4 mr-2" /> Open News Page
        </Button>
      </Link>
    </Form>
  );
}
