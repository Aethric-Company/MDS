"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { Layers, ShoppingCart, UserRound } from "lucide-react";
import { Stepper } from "./stepper";

const meta = {
  title: "Navigation/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  args: {
    steps: ["Details", "Categories", "Variants"],
    value: 0,
    onChange: () => {},
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NumberedSteps: Story = {
  render: () => {
    function NumberedStepper() {
      const [value, setValue] = useState(0);
      return <Stepper label="Numbered steps" steps={["Details", "Categories", "Variants"]} value={value} onChange={setValue} allowFutureSteps />;
    }
    return <NumberedStepper />;
  },
};

export const IconSteps: Story = {
  render: () => {
    function IconStepper() {
      const [value, setValue] = useState(1);
      return (
        <Stepper
          label="Icon steps"
          steps={[
            { label: "Details", icon: <UserRound /> },
            { label: "Categories", icon: <Layers /> },
            { label: "Variants", icon: <ShoppingCart /> },
          ]}
          value={value}
          onChange={setValue}
          borderRadius="50%"
          allowFutureSteps
        />
      );
    }
    return <IconStepper />;
  },
};

export const RestrictedToVisitedSteps: Story = {
  render: () => {
    function RestrictedStepper() {
      const [value, setValue] = useState(1);
      return <Stepper label="Restricted steps" steps={["Details", "Categories", "Variants", "Review"]} value={value} onChange={setValue} />;
    }
    return <RestrictedStepper />;
  },
};

export const AllVariants: Story = {
  render: () => {
    function AllStepperVariants() {
      const [value, setValue] = useState(1);
      return (
        <div className="grid gap-10">
          <Stepper label="Numbered steps" steps={["Details", "Categories", "Variants"]} value={value} onChange={setValue} allowFutureSteps />
          <Stepper
            label="Icon steps"
            steps={[
              { label: "Details", icon: <UserRound /> },
              { label: "Categories", icon: <Layers /> },
              { label: "Variants", icon: <ShoppingCart /> },
            ]}
            value={value}
            onChange={setValue}
            borderRadius="50%"
            allowFutureSteps
          />
        </div>
      );
    }
    return <AllStepperVariants />;
  },
};
