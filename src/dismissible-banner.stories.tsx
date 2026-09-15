"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { DismissibleBanner } from "./dismissible-banner";
import { Button } from "./button";

const meta = {
  title: "Feedback/DismissibleBanner",
  component: DismissibleBanner,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "error"],
    },
  },
  args: {
    message: "Your changes have been saved.",
    variant: "success",
    autoHideMs: 0,
    onDismiss: () => {},
  },
} satisfies Meta<typeof DismissibleBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = { render: (args) => <DismissibleBanner {...args} /> };

export const Error: Story = {
  args: { variant: "error", message: "We couldn't save your changes. Please try again." },
  render: (args) => <DismissibleBanner {...args} />,
};

export const Dismissible: Story = {
  render: () => {
    function DismissibleExample() {
      const [visible, setVisible] = useState(true);
      return visible ? (
        <DismissibleBanner message="Changes saved." variant="success" autoHideMs={0} onDismiss={() => setVisible(false)} />
      ) : (
        <Button type="button" variant="outline" onClick={() => setVisible(true)}>
          Show alert
        </Button>
      );
    }
    return <DismissibleExample />;
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <DismissibleBanner message="Your changes have been saved." variant="success" autoHideMs={0} onDismiss={() => {}} />
      <DismissibleBanner message="We couldn't save your changes. Please try again." variant="error" autoHideMs={0} onDismiss={() => {}} />
    </div>
  ),
};
