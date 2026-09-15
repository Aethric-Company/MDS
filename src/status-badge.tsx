import type { ComponentProps } from "react";
import { Badge } from "./badge";
import { cn } from "./utils";

const tones = {
  neutral: "text-zinc-600",
  success: "text-emerald-700",
  warning: "text-amber-700",
  error: "text-red-700",
  info: "text-sky-700",
} as const;

export type StatusTone = keyof typeof tones;

export function StatusBadge({ tone = "neutral", dot = true, className, children, ...props }: Omit<ComponentProps<typeof Badge>, "variant" | "asChild"> & { tone?: StatusTone; dot?: boolean }) {
  return (
    <Badge variant="outline" data-slot="status-badge" data-tone={tone} className={cn("gap-2 border-transparent bg-transparent px-0 font-semibold", tones[tone], className)} {...props}>
      {dot && <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-current" />}
      {children}
    </Badge>
  );
}
