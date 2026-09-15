import type { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from "./input";

const meta = {
  title: "Core Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "file"],
    },
  },
  args: {
    placeholder: "Material name",
    disabled: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = { args: { defaultValue: "Cement" } };

export const Disabled: Story = { args: { disabled: true, defaultValue: "Cement" } };

export const Password: Story = { args: { type: "password", placeholder: "Password" } };

export const Number: Story = { args: { type: "number", placeholder: "0" } };

export const AllStates: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-3">
      <Input placeholder="Default" />
      <Input defaultValue="With value" />
      <Input placeholder="Disabled" disabled />
      <Input type="password" placeholder="Password" />
    </div>
  ),
};
