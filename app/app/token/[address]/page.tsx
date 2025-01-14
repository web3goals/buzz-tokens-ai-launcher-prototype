"use client";

import { useParams } from "next/navigation";

export default function TokenPage() {
  const { address } = useParams();
  console.log({ address });

  return (
    <main className="container py-10 lg:px-80">
      <p>Token Page...</p>
    </main>
  );
}
