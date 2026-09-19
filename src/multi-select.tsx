"use client";
import { useId, useMemo, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Badge } from "./badge";

export type MultiSelectOption = { value: string; label: string; group?: string };
export function MultiSelect({ label, options, placeholder, value, onChange, disabled = false }: { label: string; options: MultiSelectOption[]; placeholder: string; value: string[]; onChange: (value: string[]) => void; disabled?: boolean }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  function toggle(option: string) { if (!disabled) onChange(value.includes(option) ? value.filter(item => item !== option) : [...value, option]); }
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return term ? options.filter(option => option.label.toLowerCase().includes(term)) : options;
  }, [options, search]);
  return <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium">{label}</label>
    <Popover open={open && !disabled} onOpenChange={(next) => { setOpen(next); if (!next) setSearch(""); }}>
      <PopoverTrigger asChild><Button id={id} type="button" variant="outline" disabled={disabled} className="w-full justify-between font-normal"><span className="truncate">{value.length ? `${value.length} selected` : placeholder}</span><ChevronDown aria-hidden="true" className="size-4" /></Button></PopoverTrigger>
      <PopoverContent align="start" className="flex w-[var(--radix-popover-trigger-width)] flex-col gap-2 p-2" aria-label={label}>
        {options.length > 6 && <div className="relative">
          <Search aria-hidden="true" className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search…"
            aria-label={`Search ${label}`}
            className="h-9 w-full rounded-sm border bg-transparent pl-8 pr-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </div>}
        <div className="max-h-64 min-h-0 overflow-y-auto">
          {!filtered.length && <p className="p-2 text-sm text-muted-foreground">{options.length ? "No matches." : "No options available."}</p>}
          {Array.from(new Set(filtered.map(option => option.group || ""))).map(group => <div key={group}>
            {group && <p className="p-2 text-xs font-semibold text-muted-foreground">{group}</p>}
            {filtered.filter(option => (option.group || "") === group).map(option => <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-sm p-2 text-sm hover:bg-accent"><Checkbox disabled={disabled} checked={value.includes(option.value)} onCheckedChange={() => toggle(option.value)} />{option.label}</label>)}
          </div>)}
        </div>
      </PopoverContent>
    </Popover>
    <div className="flex flex-wrap gap-1.5">{value.map(selected => { const option = options.find(item => item.value === selected); return option && <Badge key={selected} variant="secondary">{option.label}<Button type="button" variant="ghost" size="icon" className="ml-1 size-5" disabled={disabled} onClick={() => toggle(selected)} aria-label={`Remove ${option.label}`} title={`Remove ${option.label}`}><X className="size-3" /></Button></Badge>; })}</div>
  </div>;
}
