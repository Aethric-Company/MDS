"use client";

import type { ComponentProps, ReactNode } from "react";
import { ChevronRight, LogOut, Menu } from "lucide-react";
import { Button } from "./button";
import { ProfileMenu } from "./profile-menu";
import { cn } from "./utils";

export function Header({ brand, actions, children, className, ...props }: ComponentProps<"header"> & { brand?: ReactNode; actions?: ReactNode }) {
  return <header data-slot="header" className={cn("flex h-16 min-w-0 items-center gap-2 bg-background px-4 text-foreground lg:px-8", className)} {...props}>
    {brand}
    {children}
    {actions && <div className="ml-auto flex shrink-0 items-center gap-3">{actions}</div>}
  </header>;
}

export function LogoutButton({ href }: { href: string }) {
  return <Button asChild variant="ghost"><a href={href}><LogOut aria-hidden="true" className="size-4" />Log out</a></Button>;
}

export function WorkspaceHeader({ title, workspace, status, logoutHref, profileName = "My account", onOpenNavigation, className }: {
  title: string; workspace: string; status?: ReactNode; logoutHref?: string; profileName?: string; onOpenNavigation: () => void; className?: string;
}) {
  return <Header className={className} actions={<>{status}{logoutHref && <ProfileMenu name={profileName} logoutHref={logoutHref} />}</>}>
    <Button type="button" variant="ghost" size="icon" className="lg:hidden" onClick={onOpenNavigation} aria-label={`Open ${workspace} navigation`} title="Open navigation"><Menu className="size-5" /></Button>
    <span className="text-sm text-muted-foreground">{workspace}</span>
    <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
    <span className="min-w-0 truncate font-semibold">{title}</span>
  </Header>;
}
