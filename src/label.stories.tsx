import type { Meta, StoryObj } from "@storybook/nextjs";
import { Label } from "./label";
import { Input } from "./input";

const meta = {
  title: "Core Components/Label",
  component: Label,
  tags: ["autodocs"],
  args: {
    children: "Material name",
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInput: Story = {
  render: () => (
    <div className="grid max-w-sm gap-2">
      <Label htmlFor="labelled-input">Material name</Label>
      <Input id="labelled-input" placeholder="Cement" />
    </div>
  ),
};
