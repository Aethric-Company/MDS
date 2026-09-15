import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "./utils";

const tones = {
  default: "border bg-background text-foreground",
  amber: "border border-transparent bg-amber-300 text-amber-950",
  green: "border border-transparent bg-emerald-800 text-white",
  blue: "border border-transparent bg-sky-800 text-white",
  rose: "border border-transparent bg-rose-800 text-white",
};
const softTones = {
  default: "bg-muted text-foreground", amber: "bg-amber-50 text-amber-950",
  green: "bg-emerald-50 text-emerald-950", blue: "bg-sky-50 text-sky-950", rose: "bg-rose-50 text-rose-950",
};
const iconTones = { default: "bg-muted text-foreground", amber: "bg-amber-500 text-white", green: "bg-emerald-800 text-white", blue: "bg-sky-700 text-white", rose: "bg-rose-700 text-white" };

export function MetricCard({ icon: Icon, heading, subheading, description, color, bgColor, className, variant = "solid", tone = "default", change }: {
  icon?: LucideIcon; heading: ReactNode; subheading: string; description?: string;
  color?: string; bgColor?: string; className?: string; variant?: "solid" | "gradient" | "soft" | "analytics";
  change?: number | null;
  tone?: keyof typeof tones;
}) {
  if (variant === "analytics") return <article data-slot="metric-card" data-variant={variant} className={cn("min-w-0 rounded-lg bg-background p-4", className)}>
    <div className="flex min-h-5 items-start justify-between gap-3"><h2 className="text-sm font-medium">{subheading}</h2>{Icon && <Icon aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />}</div>
    <div className="mt-5 flex min-h-10 flex-wrap items-center gap-3"><p className="break-all text-[32px] font-semibold leading-none tabular-nums">{heading}</p>{change != null && Number.isFinite(change) && <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium tabular-nums", change < 0 ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700")} aria-label={`${Math.abs(change)} percent ${change < 0 ? "decrease" : "increase"}`}>
      {change < 0 ? <ArrowDown className="size-3.5" /> : <ArrowUp className="size-3.5" />}{Math.abs(change)}%
    </span>}</div>
    {description && <p className="mt-3 text-xs text-muted-foreground">{description}</p>}
  </article>;
  if (variant === "soft") return <article data-slot="metric-card" data-variant={variant} data-tone={tone} className={cn("flex min-h-28 min-w-0 items-start gap-3 rounded-lg p-4", softTones[tone], bgColor, className)}>
    {Icon && <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-full", iconTones[tone])}><Icon aria-hidden="true" className="size-5" /></span>}
    <div className="min-w-0"><h2 className="min-h-10 text-sm font-medium">{subheading}</h2><p className={cn("mt-1 break-words text-2xl font-semibold", color)}>{heading}</p>{description && <p className="mt-2 text-xs opacity-80">{description}</p>}</div>
  </article>;
  return <article data-slot="metric-card" data-variant={variant} data-tone={tone} className={cn("min-h-32 min-w-0 rounded-lg p-5", tones[tone], bgColor, className)}>
    {Icon && <Icon aria-hidden="true" className={cn("mb-3 size-5", color)} />}
    <p className={cn("break-words text-2xl font-semibold", color)}>{heading}</p>
    <h2 className="mt-2 text-sm font-medium">{subheading}</h2>
    {description && <p className={cn("mt-1 text-xs", tone === "default" ? "text-muted-foreground" : "opacity-85")}>{description}</p>}
  </article>;
}
