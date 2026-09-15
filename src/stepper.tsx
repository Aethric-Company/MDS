"use client";
import { Check } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { Button } from "./button";
import { cn } from "./utils";

export type StepperStep = string | { label: string; icon?: ReactNode };

export interface StepperProps {
  steps: StepperStep[];
  value: number;
  onChange: (step: number) => void;
  label?: string;
  allowFutureSteps?: boolean;
  /** Step marker radius: pixels as a number, or any CSS radius such as "50%". */
  borderRadius?: CSSProperties["borderRadius"];
  className?: string;
}

export function Stepper({ steps, value, onChange, label = "Progress", allowFutureSteps = false, borderRadius = 8, className }: StepperProps) {
  return <ol aria-label={label} data-slot="stepper" className={cn("flex w-full", className)}>{steps.map((item, index) => {
    const step = typeof item === "string" ? { label: item } : item;
    return <li key={index} className="relative flex min-w-0 flex-1 flex-col items-center px-1">
      {index < steps.length - 1 && <span aria-hidden="true" data-slot="stepper-connector" className={cn("absolute top-5 h-0.5 -translate-y-1/2", index < value ? "bg-primary" : "bg-border")} style={{ insetInlineStart: "calc(50% + 26px)", width: "calc(100% - 52px)" }} />}
      <Button type="button" size="icon" variant={index <= value ? "default" : "outline"} className="relative size-10 shrink-0 shadow-none disabled:opacity-100" style={{ borderRadius }} disabled={!allowFutureSteps && index > value} onClick={() => onChange(index)} aria-current={index === value ? "step" : undefined} aria-label={`${index + 1}. ${step.label}`} title={step.label}>
        <span aria-hidden="true" className="flex items-center justify-center [&_svg]:size-4">{step.icon ?? (index < value ? <Check /> : index + 1)}</span>
      </Button>
      <p className={cn("mt-3 w-full break-words text-center text-xs leading-5", index === value ? "font-semibold text-foreground" : "text-muted-foreground")}>{step.label}</p>
    </li>;
  })}</ol>;
}
