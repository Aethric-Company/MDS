"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Label } from "./label";

const meta = {
  title: "Core Components/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    function DefaultSelect() {
      const [value, setValue] = useState("ready");
      return (
        <div className="grid max-w-sm gap-2">
          <Label htmlFor="status-select">Status</Label>
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger id="status-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="pending">Pending review</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }
    return <DefaultSelect />;
  },
};

export const Loading: Story = {
  render: () => (
    <div className="max-w-sm">
      <Select value="ready">
        <SelectTrigger loading aria-label="Status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ready">Ready</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="max-w-sm">
      <Select value="ready" disabled>
        <SelectTrigger aria-label="Status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ready">Ready</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const GroupedWithLabels: Story = {
  render: () => {
    function GroupedSelect() {
      const [value, setValue] = useState("cement");
      return (
        <div className="max-w-sm">
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger aria-label="Material">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Bulk materials</SelectLabel>
                <SelectItem value="cement">Cement</SelectItem>
                <SelectItem value="sand">Sand</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Metals</SelectLabel>
                <SelectItem value="steel">Steel</SelectItem>
                <SelectItem value="rebar">Rebar</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      );
    }
    return <GroupedSelect />;
  },
};
