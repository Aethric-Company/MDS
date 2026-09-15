import type { Meta, StoryObj } from "@storybook/nextjs";
import { Separator } from "./separator";

const meta = {
  title: "Data Display/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    orientation: "horizontal",
    decorative: true,
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="max-w-sm space-y-4">
      <p>Order details</p>
      <Separator {...args} />
      <p>Delivery details</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="flex h-12 items-center gap-4">
      <p>Order details</p>
      <Separator {...args} />
      <p>Delivery details</p>
    </div>
  ),
};
