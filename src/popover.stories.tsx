import type { Meta, StoryObj } from "@storybook/nextjs";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";

const meta = {
  title: "Feedback/Popover",
  component: Popover,
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline">
          Open popover
        </Button>
      </PopoverTrigger>
      <PopoverContent>Additional material details</PopoverContent>
    </Popover>
  ),
};

export const AlignStart: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline">
          Details
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">Aligned to the start of the trigger</PopoverContent>
    </Popover>
  ),
};

export const RightSide: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline">
          Open on the right
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right">Content anchored to the right side</PopoverContent>
    </Popover>
  ),
};
