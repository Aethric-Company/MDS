import type { Meta, StoryObj } from "@storybook/nextjs";
import { Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { Button } from "./button";

const meta = {
  title: "Feedback/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="button" size="icon" variant="outline" aria-label="Add item">
            <Plus className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Add item</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const RightSide: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="button">Details</Button>
        </TooltipTrigger>
        <TooltipContent side="right">View details</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const OnText: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-default border-b border-dashed text-sm">Estimated delivery</span>
        </TooltipTrigger>
        <TooltipContent>Delivered within 3-5 business days</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
