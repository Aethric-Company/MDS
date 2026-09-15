"use client";

import { ClipboardEvent, KeyboardEvent, useRef } from "react";
import { cn } from "./utils";

export function InputOtp({
  value,
  onChange,
  length = 6,
  disabled,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  className?: string;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, index) => value[index] ?? "");

  function update(index: number, digit: string) {
    const next = digits.slice();
    next[index] = digit.replace(/\D/g, "").slice(-1);
    onChange(next.join("").slice(0, length));
    if (digit && index < length - 1) refs.current[index + 1]?.focus();
  }

  function keyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0)
      refs.current[index - 1]?.focus();
    if (event.key === "ArrowLeft" && index > 0)
      refs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < length - 1)
      refs.current[index + 1]?.focus();
  }

  function paste(event: ClipboardEvent<HTMLDivElement>) {
    const code = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!code) return;
    event.preventDefault();
    onChange(code);
    refs.current[Math.min(code.length, length) - 1]?.focus();
  }

  return (
    <div className={cn("flex gap-2", className)} onPaste={paste}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          value={digit}
          disabled={disabled}
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          aria-label={`Verification code digit ${index + 1}`}
          className="h-11 w-10 rounded-sm border border-input bg-background text-center text-lg font-semibold outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50 sm:w-11"
          onFocus={(event) => event.currentTarget.select()}
          onKeyDown={(event) => keyDown(index, event)}
          onChange={(event) => update(index, event.target.value)}
        />
      ))}
    </div>
  );
}
