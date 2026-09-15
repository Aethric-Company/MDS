"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { DatePicker } from "./date-picker";
import { Label } from "./label";

const meta = {
  title: "Core Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  args: {
    id: "delivery-date",
    value: "",
    onChange: () => {},
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    function DefaultDatePicker() {
      const [value, setValue] = useState("");
      return (
        <div className="grid max-w-sm gap-2">
          <Label htmlFor="delivery-date">Delivery date</Label>
          <DatePicker id="delivery-date" value={value} onChange={setValue} />
        </div>
      );
    }
    return <DefaultDatePicker />;
  },
};

export const WithValue: Story = {
  render: () => {
    function PrefilledDatePicker() {
      const [value, setValue] = useState("2026-09-14");
      return (
        <div className="grid max-w-sm gap-2">
          <Label htmlFor="prefilled-date">Delivery date</Label>
          <DatePicker id="prefilled-date" value={value} onChange={setValue} />
        </div>
      );
    }
    return <PrefilledDatePicker />;
  },
};

export const YearRange: Story = {
  render: () => {
    function RangedDatePicker() {
      const [value, setValue] = useState("");
      return (
        <div className="grid max-w-sm gap-2">
          <Label htmlFor="ranged-date">Delivery date</Label>
          <DatePicker id="ranged-date" value={value} onChange={setValue} fromYear={2020} toYear={2030} />
        </div>
      );
    }
    return <RangedDatePicker />;
  },
};
