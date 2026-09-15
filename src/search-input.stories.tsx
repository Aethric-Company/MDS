"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { SearchInput } from "./search-input";

const meta = {
  title: "Core Components/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  args: {
    placeholder: "Search products",
    value: "",
    onChange: () => {},
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    function DefaultSearchInput() {
      const [value, setValue] = useState("");
      return <SearchInput {...args} value={value} onChange={setValue} />;
    }
    return <DefaultSearchInput />;
  },
};

export const WithValue: Story = {
  render: (args) => {
    function PrefilledSearchInput() {
      const [value, setValue] = useState("Cement");
      return <SearchInput {...args} value={value} onChange={setValue} />;
    }
    return <PrefilledSearchInput />;
  },
};
