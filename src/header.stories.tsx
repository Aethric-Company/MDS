"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { Header, WorkspaceHeader } from "./header";
import { MpeepLogo } from "./logo";
import { Button } from "./button";
import { StatusBadge } from "./status-badge";

const meta = {
  title: "Navigation/Header",
  component: Header,
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Header brand={<MpeepLogo />} actions={<Button type="button">Dashboard</Button>} />
  ),
};

export const WorkspaceHeaderDefault: Story = {
  name: "WorkspaceHeader",
  render: () => {
    function WorkspaceHeaderExample() {
      const [message, setMessage] = useState("");
      return (
        <div className="space-y-4">
          <WorkspaceHeader
            logoutHref="#logout"
            workspace="Seller"
            title="Products"
            status={<StatusBadge tone="success">Approved seller</StatusBadge>}
            onOpenNavigation={() => setMessage("Navigation selected")}
          />
          <p role="status" className="text-sm">
            {message}
          </p>
        </div>
      );
    }
    return <WorkspaceHeaderExample />;
  },
};

export const WorkspaceHeaderNoLogout: Story = {
  name: "WorkspaceHeader (no logout)",
  render: () => (
    <WorkspaceHeader workspace="Manager" title="Orders" onOpenNavigation={() => {}} />
  ),
};
