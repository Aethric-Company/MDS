"use client";

import { LogOut, UserRound } from "lucide-react";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";

export function ProfileMenu({ name, logoutHref }: { name: string; logoutHref: string }) {
  return <DropdownMenu>
    <DropdownMenuTrigger asChild><Button type="button" variant="ghost" size="icon" aria-label="Open profile menu" title="Profile"><UserRound aria-hidden="true" className="size-5" /></Button></DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-60 max-w-[calc(100vw-2rem)]" aria-label="Profile">
      <p className="break-words px-2 py-3 text-sm font-semibold">{name.trim() || "My account"}</p>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild><a href={logoutHref}><LogOut aria-hidden="true" className="size-4" />Log out</a></DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>;
}
