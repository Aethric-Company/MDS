"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta = {
  title: "Core Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = { args: { checked: true } };

export const Indeterminate: Story = { args: { checked: "indeterminate" } };

export const Disabled: Story = { args: { disabled: true } };

export const WithLabel: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm">
      <Checkbox id="available-only" />
      <Label htmlFor="available-only">Show available materials only</Label>
    </label>
  ),
};

export const Controlled: Story = {
  render: () => {
    function ControlledCheckbox() {
      const [checked, setChecked] = useState<boolean | "indeterminate">(false);
      return (
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={checked} onCheckedChange={setChecked} />
          <Label>{checked === true ? "Checked" : checked === "indeterminate" ? "Indeterminate" : "Unchecked"}</Label>
        </label>
      );
    }
    return <ControlledCheckbox />;
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Checkbox />
      <Checkbox checked />
      <Checkbox checked="indeterminate" />
      <Checkbox disabled />
      <Checkbox disabled checked />
    </div>
  ),
};
