"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "./utils";

export function DismissibleBanner({
  message,
  onDismiss,
  variant = "success",
  autoHideMs = 5000,
  role = "status",
}: {
  message: string;
  onDismiss: () => void;
  variant?: "success" | "error";
  autoHideMs?: number;
  role?: "status" | "alert";
}) {
  useEffect(() => {
    if (!autoHideMs) return;
    const timer = window.setTimeout(onDismiss, autoHideMs);
    return () => window.clearTimeout(timer);
  }, [message, autoHideMs, onDismiss]);

  return (
    <div
      role={role}
      className={cn(
        "flex items-start justify-between gap-3 rounded-lg p-4 text-sm",
        variant === "error"
          ? "bg-destructive/10 text-destructive"
          : "bg-primary/10 text-foreground",
      )}
    >
      <p className="min-w-0">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className={cn(
          "shrink-0 rounded-md p-0.5 transition-colors hover:bg-black/5",
          variant === "error" ? "text-destructive" : "text-foreground/70",
        )}
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
