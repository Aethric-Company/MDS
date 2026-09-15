"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "./calendar";

const meta = {
  title: "Core Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => {
    function SingleCalendar() {
      const [day, setDay] = useState<Date | undefined>(new Date());
      return <Calendar mode="single" selected={day} onSelect={setDay} />;
    }
    return <SingleCalendar />;
  },
};

export const Range: Story = {
  render: () => {
    function RangeCalendar() {
      const [range, setRange] = useState<DateRange | undefined>();
      return <Calendar mode="range" selected={range} onSelect={setRange} />;
    }
    return <RangeCalendar />;
  },
};

export const DropdownCaption: Story = {
  render: () => {
    function DropdownCalendar() {
      const [day, setDay] = useState<Date | undefined>(new Date());
      return (
        <Calendar
          mode="single"
          selected={day}
          onSelect={setDay}
          captionLayout="dropdown"
          startMonth={new Date(1990, 0)}
          endMonth={new Date(new Date().getFullYear() + 2, 11)}
        />
      );
    }
    return <DropdownCalendar />;
  },
};
