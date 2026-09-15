import type { Meta, StoryObj } from "@storybook/nextjs";
import { StatusBadge } from "./status-badge";

const meta = {
  title: "Data Display/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["neutral", "success", "warning", "error", "info"],
    },
  },
  args: {
    children: "Published",
    tone: "neutral",
    dot: true,
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { children: "Draft" } };

export const Success: Story = { args: { tone: "success", children: "Published" } };

export const Warning: Story = { args: { tone: "warning", children: "Pending review" } };

export const Error: Story = { args: { tone: "error", children: "Rejected" } };

export const Info: Story = { args: { tone: "info", children: "Processing" } };

export const NoDot: Story = { args: { tone: "success", children: "Published", dot: false } };

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <StatusBadge tone="success">Published</StatusBadge>
      <StatusBadge tone="warning">Pending review</StatusBadge>
      <StatusBadge tone="error">Rejected</StatusBadge>
      <StatusBadge tone="info">Processing</StatusBadge>
      <StatusBadge tone="neutral">Draft</StatusBadge>
    </div>
  ),
};
