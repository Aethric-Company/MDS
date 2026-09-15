"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { InputOtp } from "./input-otp";

const meta = {
  title: "Core Components/InputOtp",
  component: InputOtp,
  tags: ["autodocs"],
  args: {
    value: "",
    onChange: () => {},
  },
} satisfies Meta<typeof InputOtp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    function DefaultOtp() {
      const [value, setValue] = useState("");
      return <InputOtp value={value} onChange={setValue} />;
    }
    return <DefaultOtp />;
  },
};

export const FourDigits: Story = {
  render: () => {
    function FourDigitOtp() {
      const [value, setValue] = useState("");
      return <InputOtp value={value} onChange={setValue} length={4} />;
    }
    return <FourDigitOtp />;
  },
};

export const Prefilled: Story = {
  render: () => {
    function PrefilledOtp() {
      const [value, setValue] = useState("123");
      return <InputOtp value={value} onChange={setValue} />;
    }
    return <PrefilledOtp />;
  },
};

export const Disabled: Story = {
  render: () => <InputOtp value="123456" onChange={() => {}} disabled />,
};
