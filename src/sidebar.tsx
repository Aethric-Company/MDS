"use client";

import { cloneElement, createContext, isValidElement, useContext, useRef, type ReactNode } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "./button";
import { Sheet, SheetContent, SheetTitle } from "./sheet";
import { cn } from "./utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const CollapsedContext = createContext<boolean | null>(null);

export function Sidebar({ brand, children, label = "Navigation", open, onOpenChange, collapsed, onToggleCollapsed, inline = false }: {
  brand: ReactNode; children: ReactNode; label?: string; open: boolean;
  onOpenChange: (open: boolean) => void; collapsed: boolean; onToggleCollapsed: () => void; inline?: boolean;
}) {
  const opener = useRef<HTMLElement | null>(null);
  return <>
    <aside data-slot="sidebar" className={cn("flex-col bg-background text-foreground", inline ? "relative flex min-h-72" : "fixed inset-y-0 left-0 z-40 hidden lg:flex", collapsed ? "w-20" : "w-64")}>
      <div className="flex h-16 shrink-0 items-center gap-2 px-4">{brand}</div>
      <Button type="button" variant="outline" size="icon" className="absolute bottom-4 right-4" onClick={onToggleCollapsed} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>{collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}</Button>
      <CollapsedContext.Provider value={collapsed}><nav aria-label={label} className="min-h-0 flex-1 space-y-1 overflow-y-auto p-4 pb-16">{children}</nav></CollapsedContext.Provider>
    </aside>
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 gap-0 border-r-0 p-0" aria-describedby={undefined} onOpenAutoFocus={() => { opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; }} onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus(); }}>
        <SheetTitle className="sr-only">{label}</SheetTitle>
        <div className="flex h-16 shrink-0 items-center px-4 pr-12">{brand}</div>
        <CollapsedContext.Provider value={false}><nav aria-label={label} className="min-h-0 flex-1 space-y-1 overflow-y-auto p-4">{children}</nav></CollapsedContext.Provider>
      </SheetContent>
    </Sheet>
  </>;
}

export function SidebarItem({ children, icon, label, active = false, disabled = false, collapsed = false, asChild = false, className, ...props }: React.ComponentProps<"a"> & {
  icon?: ReactNode; label?: string; active?: boolean; disabled?: boolean; collapsed?: boolean; asChild?: boolean;
}) {
  const Component = asChild ? Slot : "a";
  const contextCollapsed = useContext(CollapsedContext);
  const isCollapsed = contextCollapsed ?? collapsed;
  const classes = cn("flex min-h-10 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring", isCollapsed && "justify-center px-0", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground", disabled && "cursor-not-allowed opacity-50", className);
  const child = asChild && isValidElement<{ children?: ReactNode; title?: string }>(children) ? children : null;
  const text = label ?? (child ? child.props.children : children);
  const tooltip = label ?? (typeof text === "string" ? text : props.title ?? props["aria-label"]);
  const showTooltip = isCollapsed && Boolean(tooltip);
  const content = <>{icon && <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center [&_svg]:size-4">{icon}</span>}<span className={isCollapsed ? "sr-only" : "min-w-0 break-words"}>{text}</span></>;
  const item = disabled ? <span className={classes} aria-disabled="true" tabIndex={showTooltip ? 0 : undefined} title={showTooltip ? undefined : props.title ?? label}>{content}</span> : <Component {...props} title={showTooltip ? undefined : props.title ?? label} aria-current={active ? "page" : undefined} className={classes}>{child ? cloneElement(child, { title: showTooltip ? undefined : child.props.title }, content) : content}</Component>;
  return showTooltip ? <TooltipProvider delayDuration={200}><Tooltip><TooltipTrigger asChild>{item}</TooltipTrigger><TooltipContent side="right">{tooltip}</TooltipContent></Tooltip></TooltipProvider> : item;
}
