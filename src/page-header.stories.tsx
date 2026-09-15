import type { Meta, StoryObj } from "@storybook/nextjs";
import { PageHeader } from "./page-header";
import { Button } from "./button";

const meta = {
  title: "Navigation/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  args: {
    title: "Inventory",
    description: "Available materials",
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    actions: <Button type="button">Add item</Button>,
  },
};

export const WithBackButton: Story = {
  args: {
    onBack: () => {},
    actions: <Button type="button">Add item</Button>,
  },
};
