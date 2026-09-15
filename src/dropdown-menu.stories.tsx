"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";

const meta = {
  title: "Navigation/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    function DefaultDropdown() {
      const [selected, setSelected] = useState("");
      return (
        <div className="space-y-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="outline">
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setSelected("Edit selected")}>Edit</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSelected("Archive selected")}>Archive</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setSelected("Delete selected")}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <p role="status" className="text-sm text-muted-foreground">
            {selected}
          </p>
        </div>
      );
    }
    return <DefaultDropdown />;
  },
};

export const WithCheckboxItems: Story = {
  render: () => {
    function CheckboxDropdown() {
      const [showAvailable, setShowAvailable] = useState(true);
      const [showArchived, setShowArchived] = useState(false);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline">
              View options
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked={showAvailable} onCheckedChange={setShowAvailable}>
              Available only
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showArchived} onCheckedChange={setShowArchived}>
              Show archived
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return <CheckboxDropdown />;
  },
};

export const WithDisabledItem: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline">
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem disabled>Archive (unavailable)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
