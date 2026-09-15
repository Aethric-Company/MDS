"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { FilterBar } from "./filter-bar";
import { Button } from "./button";

const meta = {
  title: "Core Components/FilterBar",
  component: FilterBar,
  tags: ["autodocs"],
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    function DefaultFilterBar() {
      const [query, setQuery] = useState("");
      return (
        <FilterBar
          search={{ value: query, onChange: setQuery, placeholder: "Search products" }}
          onReset={query ? () => setQuery("") : undefined}
        />
      );
    }
    return <DefaultFilterBar />;
  },
};

export const WithActions: Story = {
  render: () => {
    function ActionsFilterBar() {
      const [query, setQuery] = useState("");
      return (
        <FilterBar
          search={{ value: query, onChange: setQuery, placeholder: "Search products" }}
          onReset={query ? () => setQuery("") : undefined}
          actions={
            <Button type="button" size="sm">
              Add filter
            </Button>
          }
        />
      );
    }
    return <ActionsFilterBar />;
  },
};
