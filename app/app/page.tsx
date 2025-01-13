"use client";

import useArgentTMA from "@/hooks/use-argent-tma";

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
    await argentTMA?.clearSession();
    setAccount(undefined);
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
      </div>
    </div>
  );
}
