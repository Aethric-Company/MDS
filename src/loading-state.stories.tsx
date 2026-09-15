import type { Meta, StoryObj } from "@storybook/nextjs";
import { LoadingState } from "./loading-state";

const meta = {
  title: "Feedback/LoadingState",
  component: LoadingState,
  tags: ["autodocs"],
  args: {
    label: "Loading materials",
  },
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLabel: Story = { args: { label: "Loading orders" } };
