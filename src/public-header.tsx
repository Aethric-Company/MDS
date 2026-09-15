import type { ComponentProps, ReactNode } from "react";
import { cn } from "./utils";

export function PublicHeader({ brand, actions, children, className, contentClassName, ...props }: ComponentProps<"header"> & {
  brand: ReactNode;
  actions?: ReactNode;
  contentClassName?: string;
}) {
  return <header data-slot="public-header" className={cn("relative z-20 bg-background/90 text-foreground backdrop-blur-xl", className)} {...props}>
    <div className={cn("mx-auto flex min-h-20 max-w-7xl flex-wrap items-center gap-4 px-5 py-3 sm:px-8", contentClassName)}>
      <div className="shrink-0">{brand}</div>
      {children && <div className="min-w-0 flex-1">{children}</div>}
      {actions && <div className="ml-auto flex min-w-0 flex-wrap items-center justify-end gap-3">{actions}</div>}
    </div>
  </header>;
}
