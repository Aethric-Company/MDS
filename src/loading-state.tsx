import type { ComponentProps } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "./utils";

export function LoadingState({ label = "Loading", className, ...props }: ComponentProps<"div"> & { label?: string }) {
  return (
    <div data-slot="loading-state" role="status" aria-live="polite" className={cn("flex min-h-32 items-center justify-center gap-2 text-sm text-muted-foreground", className)} {...props}>
      <LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
      <span>{label}</span>
    </div>
  );
}
