"use client";

import * as React from "react";
import { Clock3 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "./utils";

const HOURS = Array.from({ length: 12 }, (_, index) => index + 1);
const SECONDS = Array.from({ length: 60 }, (_, index) => index);

export type TimePickerProps = {
  id?: string;
  /** "HH:mm" when `seconds` is off (default), "HH:mm:ss" when on. */
  value: string;
  onChange: (value: string) => void;
  /** Show a scrollable seconds column. Default: false. */
  seconds?: boolean;
  /** Minute step for the minute column, e.g. 5 or 15. Default: 1. */
  minuteStep?: number;
  /** Value to fall back to the first time the popup opens with no value set. */
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

export function TimePicker({
  id,
  value,
  onChange,
  seconds = false,
  minuteStep = 1,
  defaultValue,
  disabled,
  placeholder = "Select time",
  className,
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const parts = React.useMemo(() => toParts(value), [value]);
  const minutes = React.useMemo(
    () => Array.from({ length: Math.ceil(60 / minuteStep) }, (_, index) => index * minuteStep),
    [minuteStep],
  );

  function handleOpenChange(next: boolean) {
    if (next && !value && defaultValue) onChange(defaultValue);
    setOpen(next);
  }
  function update(patch: Partial<{ hour: number; minute: number; second: number; period: "AM" | "PM" }>) {
    const merged = { ...parts, ...patch };
    onChange(toValue(merged, seconds));
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          disabled={disabled}
          className={cn(
            "flex h-11 w-full items-center gap-2 rounded-lg border bg-background px-3 text-sm shadow-none outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        >
          <Clock3 className="size-4 shrink-0 text-muted-foreground" />
          <span className={cn(!value && "text-muted-foreground")}>
            {value ? formatDisplay(parts, seconds) : placeholder}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="start">
        <div className="flex divide-x">
          <ScrollColumn
            label="Hour"
            values={HOURS}
            selected={parts.hour}
            onSelect={(hour) => update({ hour })}
          />
          <ScrollColumn
            label="Min"
            values={minutes}
            selected={parts.minute}
            onSelect={(minute) => update({ minute })}
            pad
          />
          {seconds && (
            <ScrollColumn
              label="Sec"
              values={SECONDS}
              selected={parts.second}
              onSelect={(second) => update({ second })}
              pad
            />
          )}
          <ScrollColumn
            label=""
            values={["AM", "PM"]}
            selected={parts.period}
            onSelect={(period) => update({ period })}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

const ITEM_HEIGHT = 32;
const VISIBLE_ITEMS = 3;
const COLUMN_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
const PAD = (COLUMN_HEIGHT - ITEM_HEIGHT) / 2;

function ScrollColumn<T extends string | number>({
  label,
  values,
  selected,
  onSelect,
  pad,
}: {
  label: string;
  values: T[];
  selected: T;
  onSelect: (value: T) => void;
  pad?: boolean;
}) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const settleTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const index = values.indexOf(selected);
  // Tracks the value under the highlight while actively scrolling; null once it matches
  // the externally-controlled `selected` value, so the highlight stays in sync with props
  // (e.g. the popover reopening on a different value) without duplicating state in an effect.
  const [scrollIndex, setScrollIndex] = React.useState<number | null>(null);
  const liveIndex = scrollIndex ?? index;

  React.useEffect(() => {
    listRef.current?.scrollTo({ top: index * ITEM_HEIGHT, behavior: "instant" });
  }, [index]);

  function handleScroll() {
    const list = listRef.current;
    if (!list) return;
    const nextIndex = Math.round(list.scrollTop / ITEM_HEIGHT);
    const clamped = Math.min(Math.max(nextIndex, 0), values.length - 1);
    setScrollIndex(clamped);

    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      list.scrollTo({ top: clamped * ITEM_HEIGHT, behavior: "smooth" });
      const value = values[clamped];
      setScrollIndex(null);
      if (value !== selected) onSelect(value);
    }, 120);
  }

  return (
    <div className="flex w-14 flex-col">
      {label && (
        <p className="px-2 pb-1 text-center text-xs font-medium text-muted-foreground">
          {label}
        </p>
      )}
      <div className="relative" style={{ height: COLUMN_HEIGHT }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-1 top-1/2 -translate-y-1/2 rounded-md bg-primary"
          style={{ height: ITEM_HEIGHT }}
        />
        <div
          ref={listRef}
          role="listbox"
          aria-label={label || "AM or PM"}
          onScroll={handleScroll}
          className="scrollbar-none relative h-full snap-y snap-mandatory overflow-y-scroll"
          style={{ paddingBlock: PAD }}
        >
          {values.map((item, itemIndex) => {
            const isLive = itemIndex === liveIndex;
            return (
              <button
                key={item}
                type="button"
                role="option"
                aria-selected={isLive}
                onClick={() => {
                  listRef.current?.scrollTo({
                    top: values.indexOf(item) * ITEM_HEIGHT,
                    behavior: "smooth",
                  });
                  setScrollIndex(null);
                  onSelect(item);
                }}
                className={cn(
                  "relative flex w-full snap-center items-center justify-center text-sm transition-colors",
                  isLive ? "font-semibold text-primary-foreground" : "text-muted-foreground",
                )}
                style={{ height: ITEM_HEIGHT }}
              >
                {pad ? String(item).padStart(2, "0") : item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

type Parts = { hour: number; minute: number; second: number; period: "AM" | "PM" };

function toParts(value: string): Parts {
  if (!value) return { hour: 9, minute: 0, second: 0, period: "AM" };
  const [hourText, minuteText = "0", secondText = "0"] = value.split(":");
  const hour24 = Number(hourText) || 0;
  return {
    hour: hour24 % 12 || 12,
    minute: Number(minuteText) || 0,
    second: Number(secondText) || 0,
    period: hour24 >= 12 ? "PM" : "AM",
  };
}

function toValue(parts: Parts, withSeconds: boolean): string {
  const hour24 = parts.period === "PM" ? (parts.hour % 12) + 12 : parts.hour % 12;
  const hh = String(hour24).padStart(2, "0");
  const mm = String(parts.minute).padStart(2, "0");
  if (!withSeconds) return `${hh}:${mm}`;
  const ss = String(parts.second).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function formatDisplay(parts: Parts, withSeconds: boolean): string {
  const mm = String(parts.minute).padStart(2, "0");
  if (!withSeconds) return `${parts.hour}:${mm} ${parts.period}`;
  const ss = String(parts.second).padStart(2, "0");
  return `${parts.hour}:${mm}:${ss} ${parts.period}`;
}
