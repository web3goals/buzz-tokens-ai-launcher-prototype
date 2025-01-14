"use client";

import { Button } from "@/components/ui/button";
import useArgentTMA from "@/hooks/use-argent-tma";
import useError from "@/hooks/use-error";
import { Loader2Icon, WalletIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { argentTMA } = useArgentTMA();
  const router = useRouter();

  const searchParams = new URLSearchParams(location.search);
  const tgStartParam = searchParams.get("tgWebAppStartParam");
  const tgStartParamToken = tgStartParam?.startsWith("t_")
    ? tgStartParam.slice(2)
    : null;
  const tgStartParamIdea = tgStartParam?.startsWith("i_")
    ? tgStartParam.slice(2)
    : null;
  console.log({
    tgStartParam,
    tgStartParamToken,
    tgStartParamIdea,
  });

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
    return <HomeConnectedAccount />;
  }

  if (
    !tgStartParamToken &&
    !tgStartParamIdea &&
    argentTMA &&
    !argentTMA.isConnected()
  ) {
    return <HomeNotConnectedAccount />;
  }

  return <HomeLoading />;
}

function HomeLoading() {
  return (
    <main className="container py-10 md:px-32 lg:px-56 xl:px-80">
      <div className="flex flex-col items-center">
        <Loader2Icon className="animate-spin text-primary" />
      </div>
    </main>
  );
}

function HomeConnectedAccount() {
  return (
    <main className="container py-10 lg:px-80">
      <p>Home page...</p>
    </main>
  );
}

function HomeNotConnectedAccount() {
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
    <main className="container py-10 lg:px-80">
      <Button onClick={() => handleConnect()}>
        <WalletIcon className="size-4 mr-2" /> Connect Argent Wallet
      </Button>
    </main>
  );
}
