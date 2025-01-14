"use client";

import { useParams } from "next/navigation";

export default function TokenLaunchPage() {
  const { id } = useParams();
  console.log({ id });

  return (
    <main className="container py-10 lg:px-80">
      <p>Token Launch Page...</p>
    </main>
  );
}
