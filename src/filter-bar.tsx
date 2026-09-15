"use client";

import type { ComponentProps, ReactNode } from "react";
import { Button } from "./button";
import { SearchInput } from "./search-input";
import { cn } from "./utils";

export type FilterBarProps = ComponentProps<"div"> & {
  search?: ComponentProps<typeof SearchInput>;
  actions?: ReactNode;
  onReset?: () => void;
  resetLabel?: string;
};

export function FilterBar({ search, actions, onReset, resetLabel = "Clear filters", children, className, ...props }: FilterBarProps) {
  return (
    <div data-slot="filter-bar" role="group" aria-label="Filters" className={cn("flex flex-wrap items-center gap-3", className)} {...props}>
      {search && <SearchInput {...search} />}
      {children}
      {onReset && <Button type="button" variant="ghost" onClick={onReset}>{resetLabel}</Button>}
      {actions && <div className="ml-auto flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
