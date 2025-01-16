"use client";

import { createToken } from "@/actions/token-action";
import { chainConfig } from "@/config/chain";
import { Token } from "@/db/models/token";
import { TokenIdea } from "@/db/models/token-idea";
import useArgentTMA from "@/hooks/use-argent-tma";
import useError from "@/hooks/use-error";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLinkIcon, Loader2Icon, RocketIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Contract } from "starknet";
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
  const router = useRouter();
  const { handleError } = useError();
  const { argentTMA, account } = useArgentTMA();
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

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsProsessing(true);
      // Check ArgentTMA
      if (!argentTMA) {
        throw new Error("ArgentTMA is undefined");
      }
      if (!argentTMA.isConnected() || !account) {
        throw new Error("Account is not connected");
      }
      // Define contract
      const { abi: contractAbi } = await argentTMA.provider.getClassAt(
        chainConfig.contracts.erc20Factory
      );
      if (contractAbi === undefined) {
        throw new Error("No ABI found for the contract");
      }
      const contract = new Contract(
        contractAbi,
        chainConfig.contracts.erc20Factory,
        argentTMA.provider
      );
      // Prepare a contract call
      const defaultErc20Supply = 1000;
      const contractCall = contract.populate("create_erc20", [
        values.name,
        values.name.length,
        values.symbol,
        values.symbol.length,
        defaultErc20Supply,
      ]);
      console.log("Contract call:", contractCall);
      // Execute transaction
      const { transaction_hash } = await account.execute(contractCall);
      console.log("Transaction hash:", transaction_hash);
      // Get address of created ERC20 from transaction event
      const txReceipt = await argentTMA.provider.waitForTransaction(
        transaction_hash
      );
      const events = contract.parseEvents(txReceipt);
      const erc20Address =
        events[0]?.["contracts::erc20_factory::ERC20Factory::ERC20Created"]
          ?.erc20;
      if (!erc20Address) {
        throw new Error("Created ERC20 address in undefined");
      }
      console.log("ERC20 address:", erc20Address);
      // Save address in database
      const token: Token = {
        name: values.name,
        symbol: values.symbol,
        description: values.description,
        address: erc20Address.toString(),
        creator: account.address,
      };
      const createTokenResponse = await createToken(token);
      if (!createTokenResponse?.data) {
        throw new Error(createTokenResponse?.error);
      }
      // Show toast
      toast({
        title: "Awesome 🤘",
        description: "Token launched",
      });
      // Redirect to token page
      router.push(`/token/${erc20Address.toString()}`);
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
