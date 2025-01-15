import { Loader2Icon } from "lucide-react";

export function HomeLoadingSection() {
  return (
    <main className="container py-6 md:px-32 lg:px-56 xl:px-80">
      <div className="flex flex-col items-center">
        <Loader2Icon className="animate-spin text-primary" />
      </div>
    </main>
  );
}
