"use client";

import { chainConfig } from "@/config/chain";
import useArgentTMA from "@/hooks/use-argent-tma";
import { Contract } from "starknet";

export default function Home() {
  const { argentTMA, account, setAccount, isConnected } = useArgentTMA();

  async function handleConnect() {
    console.log("Connecting the user...");
    await argentTMA?.requestConnection({
      callbackData: "custom_callback",
      approvalRequests: [],
    });
  }

  async function handleDisconnect() {
    console.log("Disconnecting the user...");
    await argentTMA?.clearSession();
    setAccount(undefined);
  }

  async function handleReadContract() {
    console.log("Reading contract...");
    // Check argentTMA
    if (!argentTMA) {
      throw new Error("ArgentTMA is undefined");
    }
    // Define contract
    const { abi: contractAbi } = await argentTMA.provider.getClassAt(
      chainConfig.contracts.helloStarknet
    );
    if (contractAbi === undefined) {
      throw new Error("No ABI found for the contract");
    }
    const contract = new Contract(
      contractAbi,
      chainConfig.contracts.helloStarknet,
      argentTMA.provider
    );
    // Read contract
    const contractBalance = await contract.get_balance();
    console.log("Contract balance:", contractBalance);
  }

  async function handleWriteContract() {
    console.log("Writing contract...");
    // Check argentTMA
    if (!argentTMA) {
      throw new Error("ArgentTMA is undefined");
    }
    // Define contract
    const { abi: contractAbi } = await argentTMA.provider.getClassAt(
      chainConfig.contracts.helloStarknet
    );
    if (contractAbi === undefined) {
      throw new Error("No ABI found for the contract");
    }
    const contract = new Contract(
      contractAbi,
      chainConfig.contracts.helloStarknet,
      argentTMA.provider
    );
    // Check account
    if (!account) {
      throw new Error("Account is undefined");
    }
    // Prepare a contract call
    const contractCall = contract.populate("increase_balance", [1]);
    console.log("Contract call:", contractCall);
    // Execute transaction
    const { transaction_hash } = await account.execute(contractCall);
    console.log("Transaction hash:", transaction_hash);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-col gap-2 text-center">
        <p>Connected: {isConnected ? "True" : "False"}</p>
        <p className="break-all">
          Account: {account ? account.address : "Undefined"}
        </p>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <button
          className="rounded-md bg-foreground text-background py-2 px-4"
          onClick={() => handleConnect()}
        >
          Connect
        </button>
        <button
          className="rounded-md bg-foreground text-background py-2 px-4"
          onClick={() => handleDisconnect()}
        >
          Disconnect
        </button>
        <button
          className="rounded-md bg-foreground text-background py-2 px-4"
          onClick={() => handleReadContract()}
        >
          Read Contract
        </button>
        <button
          className="rounded-md bg-foreground text-background py-2 px-4"
          onClick={() => handleWriteContract()}
        >
          Write Contract
        </button>
      </div>
    </div>
  );
}
