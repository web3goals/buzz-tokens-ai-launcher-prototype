"use client";

import { HomeConnectedAccountSection } from "@/components/home/home-connected-account-section";
import { LoadingSection } from "@/components/loading-section";
import { HomeNotConnectedAccountSection } from "@/components/home/home-not-connected-account-section";
import useArgentTMA from "@/hooks/use-argent-tma";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { argentTMA } = useArgentTMA();
  const router = useRouter();

  // Define Telegram start params for following redirecting
  const searchParams = new URLSearchParams(location.search);
  const tgStartParam = searchParams.get("tgWebAppStartParam");
  const tgStartParamToken = tgStartParam?.startsWith("t_")
    ? tgStartParam.slice(2)
    : null;
  const tgStartParamIdea = tgStartParam?.startsWith("i_")
    ? tgStartParam.slice(2)
    : null;

  useEffect(() => {
    if (tgStartParamToken) {
      router.push(`/token/${tgStartParamToken}`);
    }
  }, [tgStartParamToken, router]);

  useEffect(() => {
    if (tgStartParamIdea) {
      router.push(`/token/launch/idea/${tgStartParamIdea}`);
    }
  }, [tgStartParamIdea, router]);

  // async function handleReadContract() {
  //   console.log("Reading contract...");
  //   // Check argentTMA
  //   if (!argentTMA) {
  //     throw new Error("ArgentTMA is undefined");
  //   }
  //   // Define contract
  //   const { abi: contractAbi } = await argentTMA.provider.getClassAt(
  //     chainConfig.contracts.helloStarknet
  //   );
  //   if (contractAbi === undefined) {
  //     throw new Error("No ABI found for the contract");
  //   }
  //   const contract = new Contract(
  //     contractAbi,
  //     chainConfig.contracts.helloStarknet,
  //     argentTMA.provider
  //   );
  //   // Read contract
  //   const contractBalance = await contract.get_balance();
  //   console.log("Contract balance:", contractBalance);
  // }

  // async function handleWriteContract() {
  //   console.log("Writing contract...");
  //   // Check argentTMA
  //   if (!argentTMA) {
  //     throw new Error("ArgentTMA is undefined");
  //   }
  //   // Define contract
  //   const { abi: contractAbi } = await argentTMA.provider.getClassAt(
  //     chainConfig.contracts.helloStarknet
  //   );
  //   if (contractAbi === undefined) {
  //     throw new Error("No ABI found for the contract");
  //   }
  //   const contract = new Contract(
  //     contractAbi,
  //     chainConfig.contracts.helloStarknet,
  //     argentTMA.provider
  //   );
  //   // Check account
  //   if (!account) {
  //     throw new Error("Account is undefined");
  //   }
  //   // Prepare a contract call
  //   const contractCall = contract.populate("increase_balance", [1]);
  //   console.log("Contract call:", contractCall);
  //   // Execute transaction
  //   const { transaction_hash } = await account.execute(contractCall);
  //   console.log("Transaction hash:", transaction_hash);
  // }

  if (
    !tgStartParamToken &&
    !tgStartParamIdea &&
    argentTMA &&
    argentTMA.isConnected()
  ) {
    return <HomeConnectedAccountSection />;
  }

  if (
    !tgStartParamToken &&
    !tgStartParamIdea &&
    argentTMA &&
    !argentTMA.isConnected()
  ) {
    return <HomeNotConnectedAccountSection />;
  }

  return <LoadingSection />;
}
