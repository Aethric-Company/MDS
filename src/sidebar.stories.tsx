"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { CalendarDays, CircleCheck, Layers, MapPin, ShoppingCart, UserRound, Wrench } from "lucide-react";
import { Sidebar, SidebarItem } from "./sidebar";
import { MpeepLogo } from "./logo";
import { Button } from "./button";

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
  title: "Navigation/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  args: {
    brand: <MpeepLogo />,
    children: null,
    open: false,
    onOpenChange: () => {},
    collapsed: false,
    onToggleCollapsed: () => {},
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    function DefaultSidebar() {
      const [navOpen, setNavOpen] = useState(false);
      const [collapsed, setCollapsed] = useState(false);
      const [active, setActive] = useState("Dashboard");
      return (
        <div className="space-y-4">
          <Button type="button" variant="outline" onClick={() => setNavOpen(true)}>
            Open navigation drawer
          </Button>
          <Sidebar
            inline
            brand={<MpeepLogo showWordmark={!collapsed} />}
            label="Preview navigation"
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
            <SidebarItem disabled collapsed={collapsed} icon={<ShoppingCart aria-hidden="true" className="size-4 shrink-0" />}>
              Payments
            </SidebarItem>
          </Sidebar>
        </div>
      );
    }
    return <DefaultSidebar />;
  },
};

export const Collapsed: Story = {
  render: () => {
    function CollapsedSidebar() {
      const [navOpen, setNavOpen] = useState(false);
      return (
        <Sidebar
          inline
          brand={<MpeepLogo showWordmark={false} />}
          open={navOpen}
          onOpenChange={setNavOpen}
          collapsed
          onToggleCollapsed={() => {}}
        >
          {navItems.map(([label, Icon]) => (
            <SidebarItem key={label} label={label} href={"#" + label.toLowerCase()} icon={<Icon aria-hidden="true" className="size-4 shrink-0" />} collapsed>
              {label}
            </SidebarItem>
          ))}
        </Sidebar>
      );
    }
    return <CollapsedSidebar />;
  },
};
