"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { CalendarDays, CircleCheck, Layers, MapPin, ShoppingCart, UserRound, Wrench } from "lucide-react";
import { WorkspaceShell } from "./workspace-shell";
import { Sidebar, SidebarItem } from "./sidebar";
import { MpeepLogo } from "./logo";
import { StatusBadge } from "./status-badge";

const navItems = [
  ["Dashboard", Layers],
  ["Orders", ShoppingCart],
  ["Products", Wrench],
  ["Inventory", CircleCheck],
  ["Bookings", CalendarDays],
  ["Customers", UserRound],
  ["Locations", MapPin],
] as const;

const meta = {
  title: "Navigation/WorkspaceShell",
  component: WorkspaceShell,
  tags: ["autodocs"],
  args: {
    title: "Products",
    workspace: "Seller",
    sidebar: null,
    collapsed: false,
    onOpenNavigation: () => {},
    children: null,
  },
} satisfies Meta<typeof WorkspaceShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    function DefaultWorkspaceShell() {
      const [navOpen, setNavOpen] = useState(false);
      const [collapsed, setCollapsed] = useState(false);
      const [active, setActive] = useState("Dashboard");
      return (
        <div className="h-[560px] overflow-hidden">
          <WorkspaceShell
            title="Products"
            workspace="Seller"
            status={<StatusBadge tone="success">Approved seller</StatusBadge>}
            logoutHref="#logout"
            collapsed={collapsed}
            onOpenNavigation={() => setNavOpen(true)}
            sidebar={
              <Sidebar
                brand={<MpeepLogo showWordmark={!collapsed} />}
                open={navOpen}
                onOpenChange={setNavOpen}
                collapsed={collapsed}
                onToggleCollapsed={() => setCollapsed(!collapsed)}
              >
                {navItems.map(([label, Icon]) => (
                  <SidebarItem
                    key={label}
                    label={label}
                    href={"#" + label.toLowerCase()}
                    icon={<Icon aria-hidden="true" className="size-4 shrink-0" />}
                    collapsed={collapsed}
                    active={active === label}
                    onClick={(event) => {
                      event.preventDefault();
                      setActive(label);
                      setNavOpen(false);
                    }}
                  >
                    {label}
                  </SidebarItem>
                ))}
              </Sidebar>
            }
          >
            <div className="p-6">
              <p className="text-sm text-muted-foreground">Workspace content goes here.</p>
            </div>
          </WorkspaceShell>
        </div>
      );
    }
    return <DefaultWorkspaceShell />;
  },
};
