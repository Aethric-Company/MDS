"use client";

import { EmptyState } from "./empty-state";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

export type BarChartItem = { label: string; value: number; formattedValue: string; detail?: string };

export function BarChart({ data, label, emptyMessage = "No data for this period", variant = "default" }: { data: BarChartItem[]; label: string; emptyMessage?: string; variant?: "default" | "analytics" }) {
  const maximum = Math.max(0, ...data.map(item => Number.isFinite(item.value) ? item.value : 0));
  if (!maximum) return <EmptyState className="min-h-64" title={emptyMessage} />;
  if (variant === "analytics") {
    const step = Math.max(1, Math.ceil(maximum / 4));
    const ceiling = step * 4;
    return <div data-slot="bar-chart" data-variant={variant} role="region" aria-label={label} tabIndex={0} className="overflow-x-auto py-3 focus-visible:outline-2 focus-visible:outline-ring">
      <div className="flex gap-3" style={{ minWidth: Math.max(320, data.length * 44) }}>
        <div aria-hidden="true" className="flex h-40 w-8 shrink-0 flex-col justify-between text-right text-xs tabular-nums text-muted-foreground">{[4,3,2,1,0].map(tick => <span key={tick}>{tick * step}</span>)}</div>
        <div className="relative min-w-0 flex-1">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 flex h-40 flex-col justify-between">{[0,1,2,3,4].map(tick => <div key={tick} className="border-t border-dashed border-border/70" />)}</div>
          <TooltipProvider delayDuration={100}><div className="relative flex gap-3">{data.map((item,index) => {
            const value = Math.max(0, Number.isFinite(item.value) ? item.value : 0);
            return <div key={`${index}-${item.label}`} className="min-w-0 flex-1 text-center">
              <Tooltip><TooltipTrigger asChild><button type="button" aria-label={`${item.label}: ${item.formattedValue}`} className="group relative flex h-40 w-full items-end justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span aria-hidden="true" className={`relative block w-full max-w-12 rounded-t-sm transition-colors ${index === data.length-1 ? "bg-primary group-hover:bg-amber-500" : "bg-gray-400 group-hover:bg-gray-500"}`} style={{ height: `${value / ceiling * 100}%` }}><span className="absolute -top-6 inset-x-0 text-xs font-medium tabular-nums text-foreground">{item.formattedValue}</span></span>
              </button></TooltipTrigger><TooltipContent side="top">{item.label}: {item.formattedValue}{item.detail ? ` ${item.detail}` : ""}</TooltipContent></Tooltip>
              <p className="mt-3 text-xs text-muted-foreground">{item.label}</p>
            </div>;
          })}</div></TooltipProvider>
        </div>
      </div>
    </div>;
  }
  return <div data-slot="bar-chart" role="region" aria-label={label} tabIndex={0} className="overflow-x-auto rounded-lg bg-background px-5 py-6 focus-visible:outline-2 focus-visible:outline-ring">
    <div className="relative" style={{ minWidth: Math.max(360, data.length * 64) }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 flex h-48 flex-col justify-between">{[0, 1, 2, 3, 4].map(line => <div key={line} className="border-t border-dashed border-border" />)}</div>
      <div className="relative flex items-end gap-3">
        {data.map((item, index) => <div key={`${index}-${item.label}`} className="flex min-w-0 flex-1 flex-col items-center">
          <div className="flex h-48 w-full flex-col items-center justify-end">
            <span className="mb-2 break-all rounded bg-background px-1 text-center text-[10px] font-semibold">{item.formattedValue}</span>
            <div aria-hidden="true" className="w-full max-w-12 rounded-t-md bg-primary transition-colors hover:bg-amber-500" style={{ height: Math.max(0, Number.isFinite(item.value) ? item.value / maximum * 152 : 0) }} />
          </div>
          <p className="mt-3 text-xs font-medium">{item.label}</p>
          {item.detail && <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>}
        </div>)}
      </div>
    </div>
  </div>;
}
