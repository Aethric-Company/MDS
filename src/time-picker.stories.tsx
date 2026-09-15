"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { TimePicker } from "./time-picker";
import { Label } from "./label";

const meta = {
  title: "Core Components/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  args: {
    value: "",
    onChange: () => {},
  },
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    function DefaultTimePicker() {
      const [value, setValue] = useState("");
      return (
        <div className="max-w-sm space-y-2">
          <Label htmlFor="demo-time">Time</Label>
          <TimePicker id="demo-time" value={value} onChange={setValue} />
        </div>
      );
    }
    return <DefaultTimePicker />;
  },
};

export const FifteenMinuteStep: Story = {
  render: () => {
    function SteppedTimePicker() {
      const [value, setValue] = useState("");
      return (
        <div className="max-w-sm space-y-2">
          <Label htmlFor="stepped-time">Time</Label>
          <TimePicker id="stepped-time" value={value} onChange={setValue} minuteStep={15} />
        </div>
      );
    }
    return <SteppedTimePicker />;
  },
};

export const WithSeconds: Story = {
  render: () => {
    function SecondsTimePicker() {
      const [value, setValue] = useState("");
      return (
        <div className="max-w-sm space-y-2">
          <Label htmlFor="seconds-time">Time</Label>
          <TimePicker id="seconds-time" value={value} onChange={setValue} seconds />
        </div>
      );
    }
    return <SecondsTimePicker />;
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="max-w-sm space-y-2">
      <Label htmlFor="disabled-time">Time</Label>
      <TimePicker id="disabled-time" value="09:30" onChange={() => {}} disabled />
    </div>
  ),
};
