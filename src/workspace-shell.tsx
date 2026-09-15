"use client";
import type { ReactNode } from "react";
import { WorkspaceHeader } from "./header";
import { cn } from "./utils";

export function WorkspaceShell({ title, workspace, status, logoutHref, profileName, sidebar, collapsed, onOpenNavigation, children }: {
  title: string; workspace: string; status?: ReactNode; logoutHref?: string; profileName?: string; sidebar: ReactNode;
  collapsed: boolean; onOpenNavigation: () => void; children: ReactNode;
}) {
  return <main className="min-h-screen bg-muted/30 text-foreground">
    <WorkspaceHeader title={title} workspace={workspace} status={status} logoutHref={logoutHref} profileName={profileName} onOpenNavigation={onOpenNavigation} className={cn("fixed inset-x-0 top-0 z-20", collapsed ? "lg:left-20" : "lg:left-64")} />
    {sidebar}
    <div className={cn("min-h-screen min-w-0 pt-16", collapsed ? "lg:pl-20" : "lg:pl-64")}>{children}</div>
  </main>;
}
