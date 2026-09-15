import type { ComponentProps, ReactNode } from "react";
import { cn } from "./utils";

export function EmptyState({ title = "No results found", description, action, className, ...props }: Omit<ComponentProps<"div">, "title"> & { title?: ReactNode; description?: ReactNode; action?: ReactNode }) {
  return (
    <div data-slot="empty-state" className={cn("flex min-h-32 flex-col items-center justify-center gap-2 px-4 py-8 text-center", className)} {...props}>
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description && <p className="max-w-md text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
