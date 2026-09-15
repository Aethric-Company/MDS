"use client";

import { Slot, Slottable } from "@radix-ui/react-slot";
import { LoaderCircle } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "./utils";
import { buttonVariants } from "./button-variants";

export { buttonVariants } from "./button-variants";

export function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  children,
  disabled,
  onClickCapture,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean; loading?: boolean }) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
      disabled={disabled || loading}
      aria-busy={loading || props["aria-busy"]}
      aria-disabled={disabled || loading || props["aria-disabled"]}
      onClickCapture={(event) => {
        if (disabled || loading) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClickCapture?.(event);
      }}
    >
      {loading && <LoaderCircle aria-hidden="true" className="size-4 shrink-0 animate-spin motion-reduce:animate-none" />}
      <Slottable>{children}</Slottable>
    </Component>
  );
}
