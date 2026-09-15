import type { Meta, StoryObj } from "@storybook/nextjs";
import { EmptyState } from "./empty-state";
import { Button } from "./button";

const meta = {
  title: "Data Display/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: {
    title: "No materials found",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: "Try another search or clear your filters." },
};

export const WithAction: Story = {
  args: {
    description: "Try another search or clear your filters.",
    action: (
      <Button type="button" variant="outline">
        Clear filters
      </Button>
    ),
  },
};
