import type { Meta, StoryObj } from "@storybook/nextjs";
import { Slider } from "./slider";

const meta = {
  title: "Core Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
  render: (args) => (
    <div className="w-64">
      <Slider {...args} />
    </div>
  ),
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Range: Story = {
  args: { defaultValue: [25, 75] },
};

export const Disabled: Story = {
  args: { disabled: true },
};
