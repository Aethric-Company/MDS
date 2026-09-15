"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { MultiSelect, type MultiSelectOption } from "./multi-select";

const options: MultiSelectOption[] = [
  { value: "cement", label: "Cement" },
  { value: "steel", label: "Steel" },
  { value: "bricks", label: "Bricks" },
  { value: "sand", label: "Sand" },
];

const groupedOptions: MultiSelectOption[] = [
  { value: "cement", label: "Cement", group: "Bulk materials" },
  { value: "sand", label: "Sand", group: "Bulk materials" },
  { value: "steel", label: "Steel", group: "Metals" },
  { value: "rebar", label: "Rebar", group: "Metals" },
];

const meta = {
  title: "Core Components/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  args: {
    label: "Categories",
    placeholder: "Select categories",
    options,
    disabled: false,
    value: [],
    onChange: () => {},
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    function DefaultMultiSelect() {
      const [value, setValue] = useState<string[]>([]);
      return (
        <div className="max-w-sm">
          <MultiSelect {...args} value={value} onChange={setValue} />
        </div>
      );
    }
    return <DefaultMultiSelect />;
  },
};

export const WithSelection: Story = {
  render: (args) => {
    function PreselectedMultiSelect() {
      const [value, setValue] = useState<string[]>(["cement", "steel"]);
      return (
        <div className="max-w-sm">
          <MultiSelect {...args} value={value} onChange={setValue} />
        </div>
      );
    }
    return <PreselectedMultiSelect />;
  },
};

export const Grouped: Story = {
  args: { options: groupedOptions },
  render: (args) => {
    function GroupedMultiSelect() {
      const [value, setValue] = useState<string[]>([]);
      return (
        <div className="max-w-sm">
          <MultiSelect {...args} value={value} onChange={setValue} />
        </div>
      );
    }
    return <GroupedMultiSelect />;
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <MultiSelect {...args} value={["cement"]} onChange={() => {}} />,
};
