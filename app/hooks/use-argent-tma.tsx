import { ArgentTMAContext } from "@/components/argent-tma-provider";
import { useContext } from "react";

export default function useArgentTMA() {
  const context = useContext(ArgentTMAContext);

  if (!context) {
    throw new Error(
      "Hook useArgentTMA() must be used within a ArgentTMAProvider"
    );
  }

  return context;
}
