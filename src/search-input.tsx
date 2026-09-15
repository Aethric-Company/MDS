"use client";

import { Search } from "lucide-react";
import { cn } from "./utils";
import { Input } from "./input";

export function SearchInput({
  value,
  onChange,
  placeholder = "Search",
  "aria-label": ariaLabel,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  "aria-label"?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative w-full sm:max-w-xl", className)}>
      <Search className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
      <Input
        className="h-10 rounded-md bg-background pl-10"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel ?? placeholder}
      />
    </div>
  );
}
